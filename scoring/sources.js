/**
 * Where the scoring inputs come from. Every source is public and needs no key:
 *
 *   OpenRouter  /api/v1/models                — catalogue, prices, capabilities
 *                                               and Artificial Analysis indices
 *   OpenRouter  /api/v1/models/{id}/endpoints — which provider actually serves
 *                                               the free endpoint
 *   LM Arena    lmarena-ai/leaderboard-dataset — human-preference ratings
 *   Hugging Face /api/models/{id}             — real parameter count, downloads
 *
 * Network failures never throw: a source that is down means that layer is
 * missing for today, and the score says so in its `basis`.
 */
import { parquetReadObjects } from "hyparquet";

const UA = { "User-Agent": "free-ai-models-tracker/2.0 (github.com/ClawLabsAI/free-ai-models)" };
const TIMEOUT_MS = 20_000;

async function getJson(url, timeout = TIMEOUT_MS) {
  try {
    const res = await fetch(url, { headers: { ...UA, Accept: "application/json" }, signal: AbortSignal.timeout(timeout) });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

/** Run `fn` over `items`, at most `n` at a time. */
async function pool(items, n, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i], i);
      }
    }),
  );
  return out;
}

// ── OpenRouter ───────────────────────────────────────────────────────────────

/** The whole OpenRouter catalogue. Throws: without it there is no list. */
export async function fetchOpenRouterModels() {
  const res = await fetch("https://openrouter.ai/api/v1/models", { headers: UA });
  if (!res.ok) throw new Error(`OpenRouter API ${res.status}: ${res.statusText}`);
  return (await res.json()).data;
}

export const isFree = (m) =>
  !!m.pricing && parseFloat(m.pricing.prompt) === 0 && parseFloat(m.pricing.completion) === 0;

/** Largest value of each Artificial Analysis index across the whole catalogue. */
export function benchmarkMaxima(allModels) {
  const max = (k) => Math.max(1, ...allModels.map((m) => m.benchmarks?.artificial_analysis?.[k] ?? 0));
  return {
    intelligence: max("intelligence_index"),
    coding: max("coding_index"),
    agentic: max("agentic_index"),
  };
}

// ── Data use: does the provider behind the free endpoint train on prompts? ───

/**
 * What OpenRouter's provider table says about the providers that serve free
 * models: https://openrouter.ai/docs/guides/privacy/provider-logging
 *
 * That table is rendered in the browser from data that has no public API, so
 * this is a copy, read by hand on POLICIES_CHECKED. Only the providers seen
 * behind a free endpoint are listed; anything else is reported as unknown
 * (null), never guessed. On that date the table had 93 providers and four
 * marked "May train": DeepSeek, Liquid, NVIDIA and Thinking Machines.
 * OpenRouter calls the table its best knowledge of each provider's own
 * policy, not a definitive source — and so is this.
 *
 * `retention` is how long the provider keeps prompts: "zero", a number of
 * days, or "unknown" when the table says "retained for unknown period".
 */
export const POLICIES_CHECKED = "2026-10-10";
export const PROVIDER_POLICIES = {
  "deepseek":          { trains: true,  retention: "unknown" },
  "liquid":            { trains: true,  retention: "unknown" },
  "nvidia":            { trains: true,  retention: "unknown" },
  "thinking machines": { trains: true,  retention: "unknown" },
  "atlascloud":        { trains: false, retention: "unknown" },
  "cerebras":          { trains: false, retention: "zero" },
  "chutes":            { trains: false, retention: "unknown" },
  "cohere":            { trains: false, retention: 30 },
  "google ai studio":  { trains: false, retention: 55 },
  "google vertex":     { trains: false, retention: "zero" },
  "groq":              { trains: false, retention: "zero" },
  "meta":              { trains: false, retention: 30 },
  "mistral":           { trains: false, retention: 30 },
  "modelrun":          { trains: false, retention: "zero" },
  "nex agi":           { trains: false, retention: 30 },
  "novitaai":          { trains: false, retention: "zero" },
  "poolside":          { trains: false, retention: "unknown" },
  "z.ai":              { trains: false, retention: "zero" },
};
// The endpoints API and the policy table do not always spell a name the same way.
const POLICY_ALIASES = { novita: "novitaai", "modelrun [by modular]": "modelrun", "nvidia nim": "nvidia" };

/** The policy row for a provider name as the endpoints API spells it, or null. */
export function providerPolicy(name) {
  const key = String(name ?? "").trim().toLowerCase();
  return PROVIDER_POLICIES[POLICY_ALIASES[key] ?? key] ?? null;
}

/**
 * Provider names behind a model's free endpoints, or null if unknown.
 * The author is not the provider: a lab's open model is often served for free
 * by a host with a different policy from the lab's own API.
 */
export async function fetchServingProviders(modelId) {
  const body = await getJson(`https://openrouter.ai/api/v1/models/${modelId}/endpoints`, 10_000);
  if (!body) return null;
  const endpoints = body.data?.endpoints ?? body.endpoints ?? [];
  const free = endpoints.filter((e) => Number(e.pricing?.prompt ?? "1") === 0);
  const names = (free.length ? free : endpoints).map((e) => e.provider_name).filter(Boolean);
  return names.length ? [...new Set(names)] : null;
}

/**
 * "no-training" — none of the providers serving it for free trains on prompts
 * "mixed"       — some do; OpenRouter can be told to use only the others with
 *                 `provider: { data_collection: "deny" }`
 * "may-train"   — every provider serving it for free may train on prompts
 * null          — unknown: the endpoints call failed, or a provider is not in
 *                 PROVIDER_POLICIES yet
 */
export function dataUse(providers) {
  if (!providers || providers.length === 0) return null;
  const rows = providers.map(providerPolicy);
  if (rows.some((r) => r === null)) return null;
  const training = rows.filter((r) => r.trains).length;
  if (training === 0) return "no-training";
  return training === providers.length ? "may-train" : "mixed";
}

/**
 * How long prompts are kept, when every provider serving the model agrees:
 * "zero", a number of days, "unknown", or null when they differ or are unlisted.
 */
export function retention(providers) {
  if (!providers || providers.length === 0) return null;
  const rows = providers.map(providerPolicy);
  if (rows.some((r) => r === null)) return null;
  const all = [...new Set(rows.map((r) => r.retention))];
  return all.length === 1 ? all[0] : null;
}

export async function fetchDataUse(modelIds) {
  const lists = await pool(modelIds, 5, fetchServingProviders);
  return new Map(modelIds.map((id, i) => [id, lists[i]]));
}

// ── LM Arena ─────────────────────────────────────────────────────────────────

const ARENA_PARQUET_URL =
  "https://huggingface.co/api/datasets/lmarena-ai/leaderboard-dataset/parquet/text/latest/0.parquet";
const ARENA_CATEGORIES = new Set(["overall", "coding", "instruction_following", "spanish"]);

/**
 * One canonical spelling for a model across OpenRouter ids and Arena names.
 *   "google/gemma-4-31b-it:free" / "gemma-4-31b-it" → "gemma-4-31b"
 *   "nvidia-nemotron-3-ultra-550b-a55b-nvfp4"       → "nemotron-3-ultra-550b-a55b"
 * Matching is EXACT on this form. Matching by substring is how an old "qwen3"
 * lends its rating to "qwen3.8-27b".
 */
export function normaliseName(name) {
  return name
    .toLowerCase()
    .replace(/:free$/, "")
    .replace(/^[^/]+\//, "") // org prefix
    .replace(/\s+/g, "-")
    .replace(/^nvidia-/, "")
    .replace(/-(bf16|fp8|fp4|nvfp4|int8|int4|awq|gptq)$/, "")
    .replace(/-(it|instruct|chat)$/, "");
}

/**
 * Same model, spelled with its size or quantisation appended?
 *   want "nemotron-3.5-lightning" vs arena "nemotron-3.5-lightning-30b-a3b" → yes
 *   want "glm-5.2"                vs arena "glm-5.2-max"                    → NO
 * Only size/precision/version tokens may follow; any other word is a different
 * product.
 */
const SIZE_TOKEN = /^(\d+(\.\d+)?b|a\d+(\.\d+)?b|bf16|fp8|fp4|nvfp4|int8|int4|v\d+(\.\d+)?)$/;
export function sameArenaModel(want, arenaName) {
  const n = normaliseName(arenaName);
  if (n === want) return true;
  if (!n.startsWith(want + "-")) return false;
  return n.slice(want.length + 1).split("-").every((t) => SIZE_TOKEN.test(t));
}

/** The text leaderboard (one ~600 KB file), or null if unavailable. */
export async function fetchArenaTable() {
  try {
    const res = await fetch(ARENA_PARQUET_URL, { headers: UA, signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) return null;
    const rows = await parquetReadObjects({
      file: await res.arrayBuffer(),
      columns: ["model_name", "category", "rating", "vote_count"],
    });
    const out = [];
    for (const r of rows) {
      const category = String(r.category ?? "");
      if (!ARENA_CATEGORIES.has(category) || typeof r.rating !== "number") continue;
      out.push({
        model_name: String(r.model_name ?? ""),
        category,
        rating: r.rating,
        vote_count: typeof r.vote_count === "number" ? r.vote_count : null,
      });
    }
    // An empty table is a broken download, not "nobody is rated".
    return out.some((r) => r.category === "overall") ? out : null;
  } catch {
    return null;
  }
}

/**
 * One model's ratings out of the leaderboard (pure). When several spellings
 * match a category, the exact name wins, then the one with more votes.
 */
export function arenaFromRows(orId, rows) {
  const want = normaliseName(orId);
  const best = new Map();
  for (const r of rows) {
    if (!sameArenaModel(want, r.model_name)) continue;
    const exact = normaliseName(r.model_name) === want;
    const votes = r.vote_count ?? 0;
    const prev = best.get(r.category);
    if (!prev || (exact && !prev.exact) || (exact === prev.exact && votes > prev.votes)) {
      best.set(r.category, { rating: r.rating, votes, exact });
    }
  }
  const overall = best.get("overall");
  if (!overall) return null;
  const out = {};
  for (const [cat, v] of best) out[cat] = Math.round(v.rating);
  if (overall.votes > 0) out.votes = Math.round(overall.votes);
  return out;
}

// ── Hugging Face model card ──────────────────────────────────────────────────

export async function fetchHf(hfId) {
  const json = await getJson(`https://huggingface.co/api/models/${hfId}`);
  if (!json || typeof json !== "object" || json.error) return null;
  const total = json.safetensors?.total;
  return {
    paramsB: typeof total === "number" && total > 0 ? Math.round(total / 1e8) / 10 : null,
    downloads: typeof json.downloads === "number" ? json.downloads : null,
    pipelineTag: typeof json.pipeline_tag === "string" ? json.pipeline_tag : null,
  };
}

export async function fetchHfCards(hfIds) {
  const cards = await pool(hfIds, 5, (id) => (id ? fetchHf(id) : null));
  return new Map(hfIds.map((id, i) => [id, cards[i]]));
}
