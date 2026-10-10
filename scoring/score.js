/**
 * The score behind this repo's ranking — the whole of it, in one file.
 *
 * It ranks free chat models on what can be MEASURED, in three layers:
 *   1. Benchmarks  — Artificial Analysis indices (intelligence, coding,
 *                    agentic), which OpenRouter publishes in /api/v1/models.
 *   2. Preference  — LM Arena ratings (human votes): overall, coding,
 *                    instruction following.
 *   3. Prior       — for models nobody has measured yet: the measured quality
 *                    of a sibling in the same family, or real parameter count
 *                    and downloads from the Hugging Face model card. Capped, so
 *                    nothing unmeasured can outrank a well-measured model.
 * Then a "fitness" factor for things that matter when you build on a model:
 * context, output ceiling, tool calling, structured outputs, a published
 * shutdown date.
 *
 * This file is PURE: no network, no clock except the `today` argument. Data is
 * gathered by sources.js and passed in, so anyone can re-run it on the inputs
 * saved in data/models.json and get the same numbers.
 *
 * It is the same function ZeroLimitAI's router (zerolimitai.com) ranks with.
 * The router feeds it two extra inputs from its own production traffic —
 * `availabilityPenalty` and `latencyPenalty` — which nobody outside can
 * reproduce. Here they are left at 0, so this score is quality and fitness
 * only; the site's leaderboard can differ by those few points.
 *
 * @typedef {{ intelligence?: number|null, coding?: number|null, agentic?: number|null }} Benchmarks
 * @typedef {{ overall?: number|null, coding?: number|null, instruction_following?: number|null, spanish?: number|null, votes?: number|null }} Arena
 * @typedef {{ paramsB?: number|null, downloads?: number|null, pipelineTag?: string|null }} HfInfo
 * @typedef {object} ModelInput
 * @property {string} id                       OpenRouter id, e.g. "google/gemma-4-31b-it:free"
 * @property {number} contextLength
 * @property {number|null} [maxCompletionTokens]
 * @property {string[]} [outputModalities]
 * @property {boolean} [supportsTools]
 * @property {boolean} [supportsStructuredOutputs]
 * @property {boolean} [reasoningMandatory]
 * @property {string|null} [expirationDate]     ISO date
 * @property {Benchmarks|null} [benchmarks]
 * @property {Arena|null} [arena]
 * @property {HfInfo|null} [hf]
 * @property {number} [availabilityPenalty]     ≤ 0, production failures (not used here)
 * @property {number} [latencyPenalty]          ≤ 0, production latency (not used here)
 * @typedef {{ intelligence: number, coding: number, agentic: number }} Maxima
 * @typedef {object} Result
 * @property {string} id
 * @property {string|null} excluded             why it is not ranked as a chat model, or null
 * @property {number} quality                   0–100, before fitness
 * @property {number} score                     0–100-ish, the ordering key
 * @property {"benchmarks+arena"|"benchmarks"|"arena"|"family"|"prior"} basis
 * @property {string[]} notes
 */

// ── Tunables (one place, named) ──────────────────────────────────────────────

/** Audience: developers running coding assistants, bots and pipelines. */
export const BENCH_WEIGHTS = { intelligence: 0.45, coding: 0.35, agentic: 0.2 };
export const ARENA_WEIGHTS = { overall: 0.5, coding: 0.35, instruction_following: 0.15 };

/** Arena rating → 0–100. 1200 is a weak 2024 model, 1500 the 2026 frontier. */
export const ARENA_FLOOR = 1200;
export const ARENA_CEIL = 1500;

/** When both layers exist. Benchmarks measure what a model solves, the Arena
 *  what people prefer; they disagree often enough that neither decides alone. */
export const BLEND_BENCH = 0.55;
export const BLEND_ARENA = 0.45;
export const SINGLE_SOURCE_DISCOUNT = 0.92;

/**
 * A missing index is filled from the ones present, discounted — NOT dropped
 * with the weights renormalised, which rewards a model for reporting less
 * (a model with only a coding index would outrank its bigger sibling that also
 * reports a poor agentic score).
 * Ratios: median of (normalised index / normalised coding index) over the free
 * models that reported all three on 2026-09-21 — intelligence ≈ 0.70 of coding,
 * agentic ≈ 0.40 (agentic scores are low across the board).
 */
export const IMPUTE_FROM_CODING = { intelligence: 0.7, agentic: 0.4 };
export const IMPUTE_DISCOUNT = 0.9;

/** Production inputs, when a caller has them: failures are a tie-breaker (they
 *  mostly measure popularity), latency is a property of the model. */
const OPS_SCALE = 0.1;
const OPS_CAP = 8;
const LATENCY_SCALE = 0.2;
const LATENCY_CAP = 20;

/** Nothing unmeasured may outrank a well-measured model. */
export const PRIOR_CAP = 45;
export const FAMILY_INHERITANCE = 0.8;

const NOT_CHAT_ID = /safety|guard|moderation|embed|reward|rerank|\bocr\b/i;
const CHAT_PIPELINES = new Set(["text-generation", "image-text-to-text", "any-to-any", "conversational"]);

// ── Helpers ──────────────────────────────────────────────────────────────────

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const isNum = (v) => typeof v === "number" && Number.isFinite(v);

/** "inclusionai/ling-3.0-flash-vl:free" → "inclusionai/ling-3.0-flash" */
export function familyKey(id) {
  const [org, rest = ""] = id.toLowerCase().replace(/:free$/, "").split("/");
  const tokens = rest.split("-");
  return `${org}/${tokens.slice(0, Math.max(1, Math.min(3, tokens.length - 1))).join("-")}`;
}

/** @param {Benchmarks|null|undefined} b @param {Maxima} max @param {string[]} notes */
function benchmarkQuality(b, max, notes) {
  if (!b) return null;
  const raw = {
    intelligence: isNum(b.intelligence) ? (b.intelligence / max.intelligence) * 100 : null,
    coding: isNum(b.coding) ? (b.coding / max.coding) * 100 : null,
    agentic: isNum(b.agentic) ? (b.agentic / max.agentic) * 100 : null,
  };
  const present = Object.values(raw).filter((v) => v !== null);
  if (present.length === 0) return null;

  // Anchor for imputation: coding if present (the most widely reported), else
  // the mean of what is present.
  const anchor = raw.coding ?? present.reduce((a, c) => a + c, 0) / present.length;
  const fromCoding = raw.coding !== null;
  const filled = {
    intelligence: raw.intelligence ?? anchor * (fromCoding ? IMPUTE_FROM_CODING.intelligence : 1) * IMPUTE_DISCOUNT,
    coding: raw.coding ?? anchor * IMPUTE_DISCOUNT,
    agentic: raw.agentic ?? anchor * (fromCoding ? IMPUTE_FROM_CODING.agentic : 1) * IMPUTE_DISCOUNT,
  };
  if (present.length < 3) notes.push(`benchmarks ${present.length}/3 (rest imputed)`);
  return clamp(
    filled.intelligence * BENCH_WEIGHTS.intelligence +
      filled.coding * BENCH_WEIGHTS.coding +
      filled.agentic * BENCH_WEIGHTS.agentic,
    0,
    100,
  );
}

/** @param {Arena|null|undefined} a */
function arenaQuality(a) {
  if (!a || !isNum(a.overall)) return null;
  const norm = (r) => clamp(((r - ARENA_FLOOR) / (ARENA_CEIL - ARENA_FLOOR)) * 100, 0, 100);
  const overall = norm(a.overall);
  // A category the arena has not rated yet falls back to the overall rating.
  const coding = isNum(a.coding) ? norm(a.coding) : overall;
  const instr = isNum(a.instruction_following) ? norm(a.instruction_following) : overall;
  return overall * ARENA_WEIGHTS.overall + coding * ARENA_WEIGHTS.coding + instr * ARENA_WEIGHTS.instruction_following;
}

/** @param {HfInfo|null|undefined} hf @param {string} id */
function priorQuality(hf, id) {
  // Parameter count: Hugging Face's real total if known, else a "27b" token in the id.
  let p = isNum(hf?.paramsB) ? hf.paramsB : null;
  if (p === null) {
    const m = id.toLowerCase().match(/(?<![a-z\d.])(\d+(?:\.\d+)?)b(?![a-z])/);
    p = m ? parseFloat(m[1]) : null;
  }
  let prior = p !== null ? 4.2 * Math.log2(1 + p) : 12;
  // Adoption: 1k downloads → 0, 10M → +5
  if (isNum(hf?.downloads) && hf.downloads > 0) {
    prior += clamp((Math.log10(hf.downloads) - 3) * 1.25, 0, 5);
  }
  return clamp(prior, 0, PRIOR_CAP);
}

// ── Scoring ──────────────────────────────────────────────────────────────────

/** @param {ModelInput} m @param {string} today */
function exclusionReason(m, today) {
  const outs = m.outputModalities ?? ["text"];
  if (!outs.every((o) => o === "text")) return "does not answer in text only";
  if (NOT_CHAT_ID.test(m.id)) return "not a chat model (classifier/embedding)";
  const tag = m.hf?.pipelineTag;
  if (m.hf && tag !== undefined && (tag === null || !CHAT_PIPELINES.has(tag))) {
    return `not a chat model (pipeline: ${tag ?? "none"})`;
  }
  if (m.expirationDate && m.expirationDate.slice(0, 10) <= today) return "expired";
  return null;
}

/** @param {ModelInput} m @param {string} today @param {string[]} notes */
function fitness(m, today, notes) {
  let f = 1;
  if (m.contextLength > 0 && m.contextLength < 32_000) {
    f *= 0.85;
    notes.push("context < 32k");
  }
  if (isNum(m.maxCompletionTokens) && m.maxCompletionTokens > 0 && m.maxCompletionTokens < 4096) {
    f *= 0.8;
    notes.push("max output < 4k");
  }
  if (m.reasoningMandatory) {
    f *= 0.85;
    notes.push("always reasons (slow first token)");
  }
  // People building agents and pipelines need both.
  if (m.supportsTools) f *= 1.05;
  else notes.push("no tool calling");
  if (m.supportsStructuredOutputs) f *= 1.03;
  if (m.expirationDate) {
    const days = Math.round((Date.parse(m.expirationDate.slice(0, 10)) - Date.parse(today)) / 86_400_000);
    notes.push(`expires in ${days}d`);
    if (days <= 7) f *= 0.7;
  }
  return f;
}

/**
 * Rank a pool. Two passes, because an unmeasured model may inherit from a
 * measured sibling in its family.
 *
 * @param {ModelInput[]} pool
 * @param {Maxima} maxima  the largest value of each benchmark index across the
 *                         WHOLE catalogue (paid models included), so 100 means
 *                         "as good as the best model anyone sells".
 * @param {string} today   YYYY-MM-DD
 * @returns {Result[]}     ranked models first (best first), excluded ones last
 */
export function rank(pool, maxima, today) {
  const measured = new Map(); // family → qualities
  const partial = pool.map((m) => {
    const notes = [];
    const excluded = exclusionReason(m, today);
    const bq = benchmarkQuality(m.benchmarks, maxima, notes);
    const aq = arenaQuality(m.arena);
    let quality = null;
    let basis = "prior";
    if (bq !== null && aq !== null) {
      quality = bq * BLEND_BENCH + aq * BLEND_ARENA;
      basis = "benchmarks+arena";
    } else if (bq !== null) {
      quality = bq * SINGLE_SOURCE_DISCOUNT;
      basis = "benchmarks";
    } else if (aq !== null) {
      quality = aq * SINGLE_SOURCE_DISCOUNT;
      basis = "arena";
    }
    if (quality !== null && !excluded) {
      const k = familyKey(m.id);
      measured.set(k, [...(measured.get(k) ?? []), quality]);
    }
    return { m, notes, excluded, quality, basis };
  });

  const results = partial.map(({ m, notes, excluded, quality, basis }) => {
    let q = quality;
    let b = basis;
    if (q === null) {
      const prior = priorQuality(m.hf, m.id);
      const sib = measured.get(familyKey(m.id));
      if (sib && sib.length > 0) {
        const sorted = [...sib].sort((x, y) => x - y);
        const median = sorted[Math.floor(sorted.length / 2)];
        q = Math.max(prior, clamp(median * FAMILY_INHERITANCE, 0, PRIOR_CAP + 10));
        b = "family";
        notes.push("unmeasured: inherits from a measured sibling");
      } else {
        q = prior;
        notes.push("unmeasured: prior from size and adoption");
      }
    }
    const f = fitness(m, today, notes);
    // Health is deliberately NOT part of the score: a model that is rate-limited
    // this hour is still the better model, and a ranking is read for longer than
    // an outage lasts. "Is it answering right now?" is a separate column.
    const failures = Math.max(-OPS_CAP, (m.availabilityPenalty ?? 0) * OPS_SCALE);
    const latency = Math.max(-LATENCY_CAP, (m.latencyPenalty ?? 0) * LATENCY_SCALE);
    if (failures < 0) notes.push(`failures ${Math.round(failures)}`);
    if (latency < 0) notes.push(`slow ${Math.round(latency)}`);
    return {
      id: m.id,
      excluded,
      quality: Math.round(q * 10) / 10,
      score: Math.round((q * f + failures + latency) * 10) / 10,
      basis: b,
      notes,
    };
  });

  return results.sort((a, b) => {
    if (!!a.excluded !== !!b.excluded) return a.excluded ? 1 : -1;
    return b.score - a.score;
  });
}
