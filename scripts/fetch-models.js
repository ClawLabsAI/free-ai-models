#!/usr/bin/env node
/**
 * fetch-models.js
 *
 * Reads every free AI model from public sources (no API key), scores the chat
 * models with scoring/score.js, and writes:
 *   - data/models.json             — current snapshot, with the scoring inputs
 *   - data/history/YYYY-MM-DD.json — daily archive
 *   - README.md / README.es.md     — regenerated table section (en / es)
 *
 * Run: node scripts/fetch-models.js
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { rank } from "../scoring/score.js";
import {
  fetchOpenRouterModels,
  isFree,
  benchmarkMaxima,
  fetchDataUse,
  dataUse,
  retention,
  POLICIES_CHECKED,
  fetchArenaTable,
  arenaFromRows,
  fetchHfCards,
} from "../scoring/sources.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const UA = { "User-Agent": "free-ai-models-tracker/2.0 (github.com/ClawLabsAI/free-ai-models)" };

// ── Rate limits: the provider's, not the model's ───────────────────────
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

// ── Formatting ───────────────────────────────────────────────────────────────
function modalityBadge(modality) {
  const map = { text: "💬 text", image: "🖼️ vision", file: "📄 files" };
  return map[modality] ?? modality;
}

function fmtCtx(n) {
  if (!n) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

// ── Pollinations: read their live list ─────────────────────────────────────────
//
// Whatever their API lists for the anonymous tier today, or nothing if the
// call fails. (Four hard-coded rows used to live here and went stale.)
async function fetchPollinationsModels() {
  try {
    const res = await fetch("https://text.pollinations.ai/models", { headers: UA, signal: AbortSignal.timeout(15_000) });
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
        expires:           null,
        source:            "https://pollinations.ai",
      }));
  } catch (err) {
    console.warn(`⚠️  Pollinations list unavailable (${err.message}) — skipping`);
    return [];
  }
}

// ── "Is it answering today?" ─────────────────────────────────────────────────
//
// The score says how good a model is, not whether its free endpoint answers
// this hour. That needs real traffic, which a GitHub Action does not have, so
// this one column is borrowed from ZeroLimitAI's router (built by this repo's
// maintainers): the result of its production health checks. It only probes the
// models it routes to, so the others show "—". Optional: if the endpoint is
// unreachable the column is empty and nothing else changes.
async function fetchLiveHealth() {
  try {
    const res = await fetch("https://www.zerolimitai.com/api/models/free-top?count=20", {
      headers: UA,
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const byId = new Map();
    for (const m of await res.json()) {
      const id = m.battleModelId ?? m.modelId;
      if (!byId.has(id)) byId.set(id, { health: m.health ?? "ok", answering: m.answeringNow === true });
    }
    console.log(`✅ Live health: ${byId.size} models`);
    return byId;
  } catch (err) {
    console.warn(`⚠️  Live health unavailable (${err.message}) — "Today" column left empty`);
    return new Map();
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log("⏳ Fetching models from OpenRouter…");
  const allModels = await fetchOpenRouterModels();
  // "openrouter/free" and friends are routers over the rows below, not models.
  const freeModels = allModels.filter(isFree).filter((m) => !m.id.startsWith("openrouter/"));
  console.log(`✅ Found ${freeModels.length} free models on OpenRouter`);

  // Scoring inputs, all public (scoring/sources.js).
  const hfIds = freeModels.map((m) => m.hugging_face_id ?? null);
  const [arenaRows, hfCards, serving, pollinations, live] = await Promise.all([
    fetchArenaTable(),
    fetchHfCards(hfIds),
    fetchDataUse(freeModels.map((m) => m.id)),
    fetchPollinationsModels(),
    fetchLiveHealth(),
  ]);
  if (!arenaRows) console.warn("⚠️  LM Arena table unavailable — scoring without it today");

  const today = new Date().toISOString().slice(0, 10);
  const inputs = freeModels.map((m) => {
    const aa = m.benchmarks?.artificial_analysis;
    return {
      id: m.id,
      contextLength: m.context_length ?? 0,
      maxCompletionTokens: m.top_provider?.max_completion_tokens ?? null,
      outputModalities: m.architecture?.output_modalities,
      supportsTools: (m.supported_parameters ?? []).includes("tools"),
      supportsStructuredOutputs: (m.supported_parameters ?? []).includes("structured_outputs"),
      reasoningMandatory: !!m.reasoning?.mandatory,
      expirationDate: m.expiration_date ?? null,
      benchmarks: aa ? { intelligence: aa.intelligence_index ?? null, coding: aa.coding_index ?? null, agentic: aa.agentic_index ?? null } : null,
      arena: arenaRows ? arenaFromRows(m.id, arenaRows) : null,
      hf: m.hugging_face_id ? hfCards.get(m.hugging_face_id) ?? null : null,
    };
  });
  const maxima = benchmarkMaxima(allModels);
  const ranked = rank(inputs, maxima, today);
  const resultById = new Map(ranked.map((r) => [r.id, r]));
  const inputById = new Map(inputs.map((i) => [i.id, i]));
  let position = 0;
  const rankById = new Map(ranked.filter((r) => !r.excluded).map((r) => [r.id, ++position]));
  console.log(`✅ Scored ${rankById.size} chat models (arena: ${arenaRows ? "yes" : "no"})`);

  const openrouter = freeModels.map((m) => {
    const providerSlug = m.id.split("/")[0];
    const inputModalities  = m.architecture?.input_modalities  ?? ["text"];
    const outputModalities = m.architecture?.output_modalities ?? ["text"];
    const r = resultById.get(m.id);
    const inp = inputById.get(m.id);
    const servedBy = serving.get(m.id) ?? null;
    const h = live.get(m.id);
    return {
      id:             m.id,
      name:           m.name,
      provider:       providerSlug.charAt(0).toUpperCase() + providerSlug.slice(1).replace(/-/g, " "),
      context_window: m.context_length ?? 0,
      max_output:     m.top_provider?.max_completion_tokens ?? null,
      modalities:     [...new Set([...inputModalities, ...outputModalities])],
      output_modalities: outputModalities,
      supports_tools: inp.supportsTools,
      supports_structured_outputs: inp.supportsStructuredOutputs,
      rate_limit:     SOURCE_LIMITS.openrouter,
      // The day the provider stops serving it, when one is published.
      expires:        m.expiration_date ? String(m.expiration_date).slice(0, 10) : null,
      source:         `https://openrouter.ai/${m.id}`,
      created:        m.created ?? null,
      // A "chat" model returns text only. Music, image and audio generators are
      // free too, but they are not what people mean by "best free LLM".
      kind:           outputModalities.every((x) => x === "text") ? "chat" : "other",
      // ── Score (scoring/score.js) and the inputs it was computed from ──
      rank:           rankById.get(m.id) ?? null,
      score:          r && !r.excluded ? r.score : null,
      quality:        r && !r.excluded ? r.quality : null,
      basis:          r && !r.excluded ? r.basis : null,
      notes:          r ? r.notes : [],
      excluded:       r?.excluded ?? null,
      benchmarks:     inp.benchmarks,
      arena:          inp.arena,
      hf:             inp.hf,
      // ── Data use: who serves the free endpoint, and do they train on prompts ──
      served_by:      servedBy,
      data_use:       dataUse(servedBy),
      retention:      retention(servedBy),
      // ── Live (ZeroLimitAI's production probe; null = not probed) ──
      health:         h ? h.health : null,
      answering_now:  h ? h.answering : false,
    };
  });

  const extras = pollinations.map((m) => ({
    ...m,
    kind: (m.output_modalities ?? ["text"]).every((x) => x === "text") ? "chat" : "other",
    rank: null, score: null, quality: null, basis: null, notes: [], excluded: null,
    benchmarks: null, arena: null, hf: null,
    served_by: ["Pollinations"], data_use: null, retention: null,
    health: null, answering_now: false,
  }));

  // Ranked models in score order, then everything else by context window.
  const all = [...openrouter, ...extras]
    // `zo_score` / `zo_rank` were this repo's field names until 2026-10-10;
    // kept as aliases so existing readers of data/models.json do not break.
    .map((m) => ({ ...m, zo_score: m.score != null ? Math.round(m.score) : null, zo_rank: m.rank }))
    .sort((a, b) => {
      const ra = a.rank ?? Infinity;
      const rb = b.rank ?? Infinity;
      if (ra !== rb) return ra - rb;
      return (b.context_window ?? 0) - (a.context_window ?? 0);
    });

  const updatedAt = new Date().toISOString();
  const snapshot = {
    updated_at:        updatedAt,
    total_free_models: all.length,
    scoring:           {
      code: "scoring/score.js",
      benchmark_maxima: maxima,
      arena_available: !!arenaRows,
      provider_policies_checked: POLICIES_CHECKED,
    },
    sources:           [
      "openrouter.ai/api/v1/models",
      "openrouter.ai/api/v1/models/{id}/endpoints",
      "huggingface.co/datasets/lmarena-ai/leaderboard-dataset",
      "huggingface.co/api/models/{id}",
      "text.pollinations.ai/models",
      "zerolimitai.com/api/models/free-top (health only)",
    ],
    models:            all,
  };

  const modelsPath = join(ROOT, "data", "models.json");
  writeFileSync(modelsPath, JSON.stringify(snapshot, null, 2), "utf8");
  console.log(`💾 Written ${modelsPath}`);

  const histDir = join(ROOT, "data", "history");
  if (!existsSync(histDir)) mkdirSync(histDir, { recursive: true });
  const histPath = join(histDir, `${today}.json`);
  writeFileSync(histPath, JSON.stringify(snapshot, null, 2), "utf8");
  console.log(`📅 History snapshot: ${histPath}`);

  await updateReadme(all, updatedAt);

  console.log(`\n🎉 Done — ${all.length} free models tracked`);
}

// ── README generation ──────────────────────────────────────────────────────────
//
// Two READMEs share one table: README.md (English) and README.es.md (Spanish).
// Only the caption and the labels differ; model rows are identical.
const READMES = [
  {
    file: "README.md",
    caption: (date, n) =>
      `> Last updated: **${date}** · ${n} free chat models · ranked by the [open score](scoring/) in this repo · free-tier limits are the provider's, per account[^or][^poll]`,
    columns: ["#", "Model", "Score", "Measured by", "Trains on your prompts?", "Context", "Max output", "Tools", "Input", "Today", "Source"],
    link: "link",
    retiring: (d) => `<br><sub>⏳ retiring ${d}</sub>`,
    health: { ok: "✅ up", sick: "⚠️ degraded", dead: "❌ down" },
    answering: "▶ answering",
    basis: {
      "benchmarks+arena": "benchmarks + Arena",
      benchmarks: "benchmarks",
      arena: "Arena",
      family: "estimate (family)",
      prior: "estimate (size)",
    },
    dataUse: { "no-training": "✅ no", mixed: "⚠️ some providers", "may-train": "🔴 may train" },
    retention: (r) => (r === "zero" ? "zero retention" : r === "unknown" ? "retention unknown" : `kept ${r} days`),
    unknown: "—",
    finding: (n, of) => `**${n} of today's top ${of}** are served only by providers that may train on your prompts.`,
    otherCaption: (n) => `${n} free models that are not chat models (music, image, audio, classifiers):`,
  },
  {
    file: "README.es.md",
    caption: (date, n) =>
      `> Última actualización: **${date}** · ${n} modelos de chat gratuitos · ordenados por la [puntuación abierta](scoring/) de este repo · los límites gratuitos son del proveedor, por cuenta`,
    columns: ["#", "Modelo", "Puntuación", "Medido con", "¿Entrena con tus prompts?", "Contexto", "Salida máx.", "Tools", "Entrada", "Hoy", "Fuente"],
    link: "enlace",
    retiring: (d) => `<br><sub>⏳ se retira el ${d}</sub>`,
    health: { ok: "✅ activo", sick: "⚠️ degradado", dead: "❌ caído" },
    answering: "▶ respondiendo",
    basis: {
      "benchmarks+arena": "benchmarks + Arena",
      benchmarks: "benchmarks",
      arena: "Arena",
      family: "estimación (familia)",
      prior: "estimación (tamaño)",
    },
    dataUse: { "no-training": "✅ no", mixed: "⚠️ algunos proveedores", "may-train": "🔴 puede entrenar" },
    retention: (r) => (r === "zero" ? "retención cero" : r === "unknown" ? "retención desconocida" : `guarda ${r} días`),
    unknown: "—",
    finding: (n, of) => `**${n} de los ${of} mejores de hoy** solo los sirven proveedores que pueden entrenar con tus prompts.`,
    otherCaption: (n) => `${n} modelos gratuitos que no son de chat (música, imagen, audio, clasificadores):`,
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

    // The table is the chat models; anything the score excludes (a classifier,
    // a music generator) is listed below it, not ranked among LLMs.
    const chat  = models.filter((m) => m.kind !== "other" && !m.excluded);
    const other = models.filter((m) => m.kind === "other" || m.excluded);

    const rows = chat.map((m, i) => {
      const inputs = (m.modalities ?? ["text"]).filter((x) => x !== "text");
      const today  = m.answering_now ? cfg.answering : m.health ? cfg.health[m.health] ?? cfg.unknown : cfg.unknown;
      const expiry = m.expires ? ` ${cfg.retiring(m.expires)}` : "";
      return `| ${[
        i + 1,
        `**${m.name.replace(/\s*\(free\)\s*$/i, "")}**${expiry}`,
        m.score != null ? Math.round(m.score) : cfg.unknown,
        m.basis ? cfg.basis[m.basis] : cfg.unknown,
        m.data_use ? cfg.dataUse[m.data_use] + (m.data_use === "no-training" && m.retention != null ? ` · ${cfg.retention(m.retention)}` : "") : cfg.unknown,
        m.context_window ? fmtCtx(m.context_window) : cfg.unknown,
        m.max_output ? fmtCtx(m.max_output) : cfg.unknown,
        m.supports_tools ? "✓" : m.supports_tools === false ? "✗" : cfg.unknown,
        inputs.length ? inputs.map(modalityBadge).join(", ") : "💬 text",
        today,
        `[${cfg.link}](${m.source})`,
      ].join(" | ")} |`;
    });

    const otherBlock = other.length
      ? ["", cfg.otherCaption(other.length), "", ...other.map((m) => `- [${m.name}](${m.source})`)]
      : [];

    // The one-line finding, recomputed every day so it never goes stale.
    const top = chat.filter((m) => m.score != null).slice(0, 10);
    const training = top.filter((m) => m.data_use === "may-train").length;

    const tableBlock = [
      `<!-- TABLE_START -->`,
      cfg.caption(dateLabel, chat.length),
      `>`,
      `> ${cfg.finding(training, top.length)}`,
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
