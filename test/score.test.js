/**
 * The score is the product here, so its rules are pinned. Each test is a
 * mistake an earlier version of the ranking actually made.
 * Run: npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { rank, familyKey, PRIOR_CAP } from "../scoring/score.js";
import { normaliseName, sameArenaModel, arenaFromRows, dataUse, retention } from "../scoring/sources.js";

const MAX = { intelligence: 57.6, coding: 81.6, agentic: 57.9 };
const TODAY = "2026-10-10";
const base = { contextLength: 262_144, maxCompletionTokens: 32_768, supportsTools: true };
const byId = (rows) => Object.fromEntries(rows.map((r) => [r.id, r]));

test("a measured model outranks an unmeasured one, however large", () => {
  const r = rank(
    [
      { ...base, id: "lab/huge-900b:free", hf: { paramsB: 900, downloads: 5e7, pipelineTag: "text-generation" } },
      { ...base, id: "lab/small-27b:free", benchmarks: { intelligence: 30, coding: 50, agentic: 20 } },
    ],
    MAX,
    TODAY,
  );
  assert.equal(r[0].id, "lab/small-27b:free");
  assert.ok(byId(r)["lab/huge-900b:free"].quality <= PRIOR_CAP);
  assert.equal(byId(r)["lab/huge-900b:free"].basis, "prior");
});

test("reporting fewer benchmarks never raises a score", () => {
  const full = { intelligence: 20, coding: 45, agentic: 5 };
  const r = byId(
    rank(
      [
        { ...base, id: "a/full:free", benchmarks: full },
        { ...base, id: "b/coding-only:free", benchmarks: { coding: 45 } },
      ],
      MAX,
      TODAY,
    ),
  );
  // The missing indices are imputed at a discount, not dropped.
  assert.ok(r["b/coding-only:free"].notes.some((n) => n.includes("imputed")));
  assert.ok(Math.abs(r["a/full:free"].quality - r["b/coding-only:free"].quality) < 15);
});

test("benchmarks and Arena are blended; one source alone is discounted", () => {
  const b = { intelligence: 25, coding: 52, agentic: 22 };
  const a = { overall: 1441, coding: 1464, instruction_following: 1425 };
  const r = byId(
    rank(
      [
        { ...base, id: "x/both:free", benchmarks: b, arena: a },
        { ...base, id: "y/bench:free", benchmarks: b },
        { ...base, id: "z/arena:free", arena: a },
      ],
      MAX,
      TODAY,
    ),
  );
  assert.equal(r["x/both:free"].basis, "benchmarks+arena");
  assert.equal(r["y/bench:free"].basis, "benchmarks");
  assert.equal(r["z/arena:free"].basis, "arena");
  assert.ok(r["x/both:free"].quality > r["y/bench:free"].quality);
});

test("an unmeasured model inherits from a measured sibling, at a discount", () => {
  const r = byId(
    rank(
      [
        { ...base, id: "lab/ling-3.0-flash-vl:free", benchmarks: { intelligence: 25, coding: 40, agentic: 10 } },
        { ...base, id: "lab/ling-3.0-flash-sante:free" },
      ],
      MAX,
      TODAY,
    ),
  );
  assert.equal(familyKey("lab/ling-3.0-flash-vl:free"), familyKey("lab/ling-3.0-flash-sante:free"));
  assert.equal(r["lab/ling-3.0-flash-sante:free"].basis, "family");
  assert.ok(r["lab/ling-3.0-flash-sante:free"].quality < r["lab/ling-3.0-flash-vl:free"].quality);
});

test("classifiers, non-text generators and expired models are not ranked", () => {
  const r = byId(
    rank(
      [
        { ...base, id: "nvidia/nemotron-3.5-content-safety:free" },
        { ...base, id: "google/lyria-3:free", outputModalities: ["text", "audio"] },
        { ...base, id: "old/model:free", expirationDate: "2026-10-01" },
        { ...base, id: "ok/model:free" },
      ],
      MAX,
      TODAY,
    ),
  );
  assert.match(r["nvidia/nemotron-3.5-content-safety:free"].excluded, /not a chat model/);
  assert.match(r["google/lyria-3:free"].excluded, /text only/);
  assert.equal(r["old/model:free"].excluded, "expired");
  assert.equal(r["ok/model:free"].excluded, null);
});

test("fitness: no tools, tiny context and an imminent shutdown cost points", () => {
  const b = { intelligence: 25, coding: 52, agentic: 22 };
  const r = byId(
    rank(
      [
        { ...base, id: "a/good:free", benchmarks: b },
        { ...base, id: "b/no-tools:free", benchmarks: b, supportsTools: false },
        { ...base, id: "c/small:free", benchmarks: b, contextLength: 8_192 },
        { ...base, id: "d/leaving:free", benchmarks: b, expirationDate: "2026-10-14" },
      ],
      MAX,
      TODAY,
    ),
  );
  for (const id of ["b/no-tools:free", "c/small:free", "d/leaving:free"]) {
    assert.ok(r[id].score < r["a/good:free"].score, id);
    assert.equal(r[id].quality, r["a/good:free"].quality, `${id}: quality is untouched by fitness`);
  }
});

test("Arena names match exactly, or with size/precision tokens only", () => {
  assert.equal(normaliseName("google/gemma-4-31b-it:free"), "gemma-4-31b");
  assert.equal(normaliseName("nvidia-nemotron-3-ultra-550b-a55b-nvfp4"), "nemotron-3-ultra-550b-a55b");
  assert.ok(sameArenaModel("nemotron-3.5-lightning", "nemotron-3.5-lightning-30b-a3b"));
  assert.ok(!sameArenaModel("glm-5.2", "glm-5.2-max"));
  assert.ok(!sameArenaModel("qwen3", "qwen3.8-27b"));
  const rows = [
    { model_name: "gemma-4-31b-it", category: "overall", rating: 1443.4, vote_count: 6145 },
    { model_name: "gemma-4-31b-it", category: "coding", rating: 1459.2, vote_count: 900 },
    { model_name: "gemma-3-27b-it", category: "overall", rating: 1350, vote_count: 90000 },
  ];
  assert.deepEqual(arenaFromRows("google/gemma-4-31b-it:free", rows), { overall: 1443, coding: 1459, votes: 6145 });
  assert.equal(arenaFromRows("google/gemma-5:free", rows), null);
});

test("data use: only what the provider table says, never a guess", () => {
  assert.equal(dataUse(["Nvidia"]), "may-train");
  assert.equal(dataUse(["Google AI Studio"]), "no-training");
  assert.equal(dataUse(["Novita"]), "no-training"); // the endpoints API's spelling of NovitaAI
  assert.equal(dataUse(["Nvidia", "Groq"]), "mixed");
  assert.equal(dataUse(["Some New Host"]), null);
  assert.equal(dataUse(null), null);
  assert.equal(retention(["Google AI Studio"]), 55);
  assert.equal(retention(["Novita"]), "zero");
  assert.equal(retention(["Poolside"]), "unknown");
  assert.equal(retention(["Some New Host"]), null);
});
