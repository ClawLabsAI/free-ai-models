#!/usr/bin/env node
/**
 * fetch-models.js
 *
 * Fetches all currently available FREE AI models from OpenRouter's public API
 * (no API key required), enriches with known metadata, and writes:
 *   - data/models.json          — current snapshot
 *   - data/history/YYYY-MM-DD.json — daily archive
 *   - README.md                 — regenerated table section
 *
 * Run: node scripts/fetch-models.js
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Known rate limits per provider (requests/minute unless noted) ──────────────
const RATE_LIMITS = {
  "google/gemini":         "15 req/min · 1M tokens/day",
  "meta-llama":            "30 req/min",
  "deepseek":              "20 req/min",
  "qwen":                  "20 req/min",
  "mistralai":             "5 req/min",
  "microsoft":             "10 req/min",
  "nvidia":                "40 req/min",
  "nousresearch":          "20 req/min",
  "liquid":                "10 req/min",
  "sophosympatheia":       "20 req/min",
};

function getRateLimit(modelId) {
  for (const [prefix, limit] of Object.entries(RATE_LIMITS)) {
    if (modelId.includes(prefix)) return limit;
  }
  return "varies";
}

// ── Modality icons ─────────────────────────────────────────────────────────────
function modalityBadge(modality) {
  const map = {
    text:  "💬 text",
    image: "🖼️ vision",
    file:  "📄 files",
  };
  return map[modality] ?? modality;
}

// ── Format context window ──────────────────────────────────────────────────────
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

// ── Additional free providers not on OpenRouter ────────────────────────────────
const EXTRA_PROVIDERS = [
  {
    id:             "pollinations/mistral-nemo",
    name:           "Mistral Nemo",
    provider:       "Pollinations AI",
    context_window: 128_000,
    modalities:     ["text"],
    rate_limit:     "unlimited (no auth)",
    notes:          "No API key required",
    source:         "https://pollinations.ai",
  },
  {
    id:             "pollinations/mistral-small",
    name:           "Mistral Small 3.2",
    provider:       "Pollinations AI",
    context_window: 128_000,
    modalities:     ["text"],
    rate_limit:     "unlimited (no auth)",
    notes:          "No API key required",
    source:         "https://pollinations.ai",
  },
  {
    id:             "pollinations/gemini-2.0-flash",
    name:           "Gemini 2.0 Flash",
    provider:       "Pollinations AI",
    context_window: 1_048_576,
    modalities:     ["text", "image"],
    rate_limit:     "unlimited (no auth)",
    notes:          "No API key required",
    source:         "https://pollinations.ai",
  },
  {
    id:             "pollinations/openai-large",
    name:           "GPT-4o",
    provider:       "Pollinations AI",
    context_window: 128_000,
    modalities:     ["text", "image"],
    rate_limit:     "unlimited (no auth)",
    notes:          "No API key required",
    source:         "https://pollinations.ai",
  },
];

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
      modalities:     allModalities.filter((x) => x !== "text" || true),
      rate_limit:     getRateLimit(m.id),
      notes:          "",
      source:         `https://openrouter.ai/${m.id}`,
      created:        m.created ?? null,
    };
  });

  // Merge extra providers
  const all = [...normalised, ...EXTRA_PROVIDERS];

  // Sort: context window desc
  all.sort((a, b) => (b.context_window ?? 0) - (a.context_window ?? 0));

  const updatedAt = new Date().toISOString();
  const snapshot = {
    updated_at:        updatedAt,
    total_free_models: all.length,
    sources:           ["openrouter.ai/api/v1/models", "pollinations.ai"],
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
async function updateReadme(models, updatedAt) {
  const readmePath = join(ROOT, "README.md");
  const readme     = readFileSync(readmePath, "utf8");

  const dateLabel = new Date(updatedAt).toUTCString().replace(" GMT", " UTC");

  const header = [
    `| # | Model | Provider | Context | Modalities | Rate Limit | Source |`,
    `|---|-------|----------|---------|------------|------------|--------|`,
  ].join("\n");

  const rows = models.map((m, i) => {
    const ctx         = fmtCtx(m.context_window);
    const modalities  = (m.modalities ?? ["text"]).map(modalityBadge).join(", ");
    const rateLimit   = m.rate_limit ?? "varies";
    const source      = `[link](${m.source})`;
    return `| ${i + 1} | **${m.name}** | ${m.provider} | ${ctx} | ${modalities} | ${rateLimit} | ${source} |`;
  });

  const tableBlock = [
    `<!-- TABLE_START -->`,
    `> Last updated: **${dateLabel}** · ${models.length} models tracked`,
    ``,
    header,
    rows.join("\n"),
    `<!-- TABLE_END -->`,
  ].join("\n");

  const updated = readme.replace(
    /<!-- TABLE_START -->[\s\S]*?<!-- TABLE_END -->/,
    tableBlock
  );

  writeFileSync(readmePath, updated, "utf8");
  console.log(`📝 README.md updated`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
