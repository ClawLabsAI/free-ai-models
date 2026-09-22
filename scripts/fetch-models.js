#!/usr/bin/env node
/**
 * fetch-models.js
 *
 * Fetches all currently available FREE AI models from OpenRouter's public API
 * (no API key required), enriches with known metadata, and writes:
 *   - data/models.json          — current snapshot
 *   - data/history/YYYY-MM-DD.json — daily archive
 *   - README.md / README.es.md  — regenerated table section (en / es)
 *
 * Run: node scripts/fetch-models.js
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Rate limits: the provider's, not the model's ───────────────────────
//
// This used to be a hand-written map keyed by the model id ("nvidia" → 40
// req/min, "mistralai" → 5 req/min). Those numbers were invented: every row
// here comes from OpenRouter, where the free-model limit belongs to the
// ACCOUNT, is the same for every `:free` model, and has nothing to do with who
// trained it. Publishing a made-up limit is exactly the staleness this repo
// exists to avoid, so the limit now comes from the source, with a citation.
//
// OpenRouter, "Free usage limits" (checked 2026-09-23):
//   https://openrouter.ai/docs/api-reference/limits
//   :free models — 20 requests/minute, 50 requests/day per account,
//   or 1,000/day once the account has purchased $10 in credits. Limits are
//   global per account: extra keys do not widen them.
const SOURCE_LIMITS = {
  openrouter:   "20 RPM · 50 RPD",
  pollinations: "anonymous tier (no key)",
};

// ── Modality icons ─────────────────────────────────────────────────────────────
function modalityBadge(modality) {
  const map = {
    text:  "💬 text",
    image: "🖼️ vision",
    file:  "📄 files",
  };
  return map[modality] ?? modality;
}

// ── Format token counts ──────────────────────────────────────────────────────
function fmtCtx(n) {
  if (!n) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

// ── Fetch from OpenRouter ──────────────────────────────────────────────────────
async function fetchOpenRouterModels() {
  const res = await fetch("https://openrouter.ai/api/v1/models", {
    headers: { "User-Agent": "free-ai-models-tracker/1.0 (github.com/ClawLabsAI/free-ai-models)" },
  });
  if (!res.ok) throw new Error(`OpenRouter API ${res.status}: ${res.statusText}`);
  const { data } = await res.json();
  return data;
}

// ── Pollinations: read their live list ─────────────────────────────────────────
//
// This used to be four hard-coded rows (Mistral Nemo, Mistral Small, Gemini 2.0
// Flash, GPT-4o — all "unlimited (no auth)"). Pollinations has since cut its
// anonymous tier to a fraction of that, and the rows stayed, which is exactly
// the staleness this repo exists to avoid. Now: whatever their API lists for
// the anonymous tier today, or nothing if the call fails.
async function fetchPollinationsModels() {
  try {
    const res = await fetch("https://text.pollinations.ai/models", {
      headers: { "User-Agent": "free-ai-models-tracker/1.0 (github.com/ClawLabsAI/free-ai-models)" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const list = await res.json();
    return list
      .filter((m) => m.tier === "anonymous")
      .map((m) => ({
        id:                `pollinations/${m.name}`,
        name:              m.description ?? m.name,
        provider:          "Pollinations AI",
        context_window:    null,
        max_output:        null,
        modalities:        [...new Set([...(m.input_modalities ?? ["text"]), ...(m.output_modalities ?? ["text"])])],
        output_modalities: m.output_modalities ?? ["text"],
        rate_limit:        SOURCE_LIMITS.pollinations,
        notes:             "No API key required",
        source:            "https://pollinations.ai",
      }));
  } catch (err) {
    console.warn(`⚠️  Pollinations list unavailable (${err.message}) — skipping`);
    return [];
  }
}

// ── ZeroOptimize ranking + today's health ──────────────────────────────────────
//
// Public endpoint of zerolimitai.com (the router built by this repo's
// maintainers): the same scores and health marks its production routing uses.
// `zoPct` is the score relative to the best model (0-100); `health` comes from a
// daily probe plus live failures. Optional: if it is unreachable the table
// falls back to context-window order and says so.
async function fetchZoRanking() {
  try {
    const res = await fetch("https://www.zerolimitai.com/api/models/free-top?count=20", {
      headers: { "User-Agent": "free-ai-models-tracker/1.0 (github.com/ClawLabsAI/free-ai-models)" },
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const list = await res.json();
    const byId = new Map();
    for (const m of list) {
      const id = m.battleModelId ?? m.modelId;
      if (!byId.has(id)) byId.set(id, { score: Math.round(m.zoPct ?? 0), health: m.health ?? "ok" });
    }
    console.log(`✅ ZeroOptimize ranking: ${byId.size} models`);
    return byId;
  } catch (err) {
    console.warn(`⚠️  ZeroOptimize ranking unavailable (${err.message}) — ordering by context window`);
    return new Map();
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log("⏳ Fetching models from OpenRouter…");
  const allModels = await fetchOpenRouterModels();

  // Filter: free models have pricing.prompt === "0" && pricing.completion === "0"
  const freeModels = allModels.filter(
    (m) =>
      m.pricing &&
      (m.pricing.prompt === "0" || parseFloat(m.pricing.prompt) === 0) &&
      (m.pricing.completion === "0" || parseFloat(m.pricing.completion) === 0)
  );

  console.log(`✅ Found ${freeModels.length} free models on OpenRouter`);

  // Normalise OpenRouter models
  const normalised = freeModels.map((m) => {
    const providerSlug = m.id.split("/")[0];
    const providerName =
      providerSlug.charAt(0).toUpperCase() + providerSlug.slice(1).replace(/-/g, " ");
    const inputModalities  = m.architecture?.input_modalities  ?? ["text"];
    const outputModalities = m.architecture?.output_modalities ?? ["text"];
    const allModalities    = [...new Set([...inputModalities, ...outputModalities])];

    return {
      id:             m.id,
      name:           m.name,
      provider:       providerName,
      context_window: m.context_length ?? 0,
      max_output:     m.top_provider?.max_completion_tokens ?? null,
      modalities:     allModalities,
      output_modalities: outputModalities,
      rate_limit:     SOURCE_LIMITS.openrouter,
      notes:          "",
      source:         `https://openrouter.ai/${m.id}`,
      created:        m.created ?? null,
    };
  });

  // Merge Pollinations (live) and attach ranking + health
  const [pollinations, ranking] = await Promise.all([fetchPollinationsModels(), fetchZoRanking()]);
  const all = [...normalised, ...pollinations].map((m) => {
    const r = ranking.get(m.id);
    return {
      ...m,
      // A "chat" model returns text. Music, image and audio generators are
      // free too, but ranking them among LLMs by context window put Google's
      // Lyria (music) at #4 of a list people read as "best free LLMs".
      // Text-only output. Lyria reports ["text","audio"]: it answers with music.
      kind:     (m.output_modalities ?? ["text"]).every((x) => x === "text") ? "chat" : "other",
      zo_score: r ? r.score : null,
      health:   r ? r.health : null,
    };
  });

  // Sort: ranked models first by score, then everything else by context window
  all.sort((a, b) => {
    if ((a.zo_score ?? -1) !== (b.zo_score ?? -1)) return (b.zo_score ?? -1) - (a.zo_score ?? -1);
    return (b.context_window ?? 0) - (a.context_window ?? 0);
  });

  const updatedAt = new Date().toISOString();
  const snapshot = {
    updated_at:        updatedAt,
    total_free_models: all.length,
    sources:           ["openrouter.ai/api/v1/models", "text.pollinations.ai/models", "zerolimitai.com/api/models/free-top"],
    models:            all,
  };

  // Write data/models.json
  const modelsPath = join(ROOT, "data", "models.json");
  writeFileSync(modelsPath, JSON.stringify(snapshot, null, 2), "utf8");
  console.log(`💾 Written ${modelsPath}`);

  // Write daily history snapshot
  const dateStr = new Date().toISOString().slice(0, 10);
  const histDir = join(ROOT, "data", "history");
  if (!existsSync(histDir)) mkdirSync(histDir, { recursive: true });
  const histPath = join(histDir, `${dateStr}.json`);
  writeFileSync(histPath, JSON.stringify(snapshot, null, 2), "utf8");
  console.log(`📅 History snapshot: ${histPath}`);

  // Regenerate README table
  await updateReadme(all, updatedAt);

  console.log(`\n🎉 Done — ${all.length} free models tracked`);
}

// ── README generation ──────────────────────────────────────────────────────────
//
// Two READMEs share one table: README.md (English) and README.es.md (Spanish,
// added 2026-09 for "modelos de IA gratis" searches). Only the caption and the
// column headers differ; model rows are identical.
const READMES = [
  {
    file: "README.md",
    caption: (date, n) =>
      `> Last updated: **${date}** · ${n} chat models · ranked by [ZeroOptimize](https://www.zerolimitai.com/leaderboard) score, then context window · rate limits are the provider's, per account[^or][^poll]`,
    columns: ["#", "Model", "Provider", "Context", "Max output", "Modalities", "Rate Limit", "Score", "Today", "Source"],
    link: "link",
    health: { ok: "✅ up", sick: "⚠️ degraded", dead: "❌ down" },
    otherCaption: (n) => `${n} free models that are not chat models (music, image, audio generation):`,
  },
  {
    file: "README.es.md",
    caption: (date, n) =>
      `> Última actualización: **${date}** · ${n} modelos de chat · ordenados por puntuación [ZeroOptimize](https://www.zerolimitai.com/leaderboard) y después por contexto · los límites son del proveedor, por cuenta`,
    columns: ["#", "Modelo", "Proveedor", "Contexto", "Salida máx.", "Modalidades", "Límite de uso", "Puntuación", "Hoy", "Fuente"],
    link: "enlace",
    health: { ok: "✅ activo", sick: "⚠️ degradado", dead: "❌ caído" },
    otherCaption: (n) => `${n} modelos gratuitos que no son de chat (generación de música, imagen o audio):`,
  },
];

async function updateReadme(models, updatedAt) {
  const dateLabel = new Date(updatedAt).toUTCString().replace(" GMT", " UTC");

  for (const cfg of READMES) {
    const readmePath = join(ROOT, cfg.file);
    if (!existsSync(readmePath)) continue;
    const readme = readFileSync(readmePath, "utf8");

    const header = [
      `| ${cfg.columns.join(" | ")} |`,
      `|${cfg.columns.map(() => "---").join("|")}|`,
    ].join("\n");

    const chat  = models.filter((m) => m.kind !== "other");
    const other = models.filter((m) => m.kind === "other");

    const rows = chat.map((m, i) => {
      const ctx        = m.context_window ? fmtCtx(m.context_window) : "—";
      const maxOut     = m.max_output ? fmtCtx(m.max_output) : "—";
      const modalities = (m.modalities ?? ["text"]).map(modalityBadge).join(", ");
      const rateLimit  = m.rate_limit ?? "varies";
      const score      = m.zo_score != null ? String(m.zo_score) : "—";
      const today      = m.health ? cfg.health[m.health] ?? "—" : "—";
      const source     = `[${cfg.link}](${m.source})`;
      return `| ${i + 1} | **${m.name}** | ${m.provider} | ${ctx} | ${maxOut} | ${modalities} | ${rateLimit} | ${score} | ${today} | ${source} |`;
    });

    const otherBlock = other.length
      ? ["", cfg.otherCaption(other.length), "", ...other.map((m) => `- [${m.name}](${m.source})`)]
      : [];

    const tableBlock = [
      `<!-- TABLE_START -->`,
      cfg.caption(dateLabel, chat.length),
      ``,
      header,
      rows.join("\n"),
      ...otherBlock,
      `<!-- TABLE_END -->`,
    ].join("\n");

    const updated = readme.replace(
      /<!-- TABLE_START -->[\s\S]*?<!-- TABLE_END -->/,
      tableBlock
    );

    writeFileSync(readmePath, updated, "utf8");
    console.log(`📝 ${cfg.file} updated`);
  }
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
