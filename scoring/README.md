# The score

Two files:

- [`score.js`](score.js) — the ranking function. Pure: no network, no clock
  except the `today` argument. Give it the same inputs and it returns the same
  ranking, which is why every day's inputs are saved in
  [`data/history/`](../data/history).
- [`sources.js`](sources.js) — where the inputs come from. All public, no key.

```js
import { rank } from "./scoring/score.js";

const results = rank(pool, maxima, "2026-10-10");
// → [{ id, score, quality, basis, notes, excluded }, …]  best first
```

## What goes in

| Input | Source | Used for |
|---|---|---|
| Intelligence, coding and agentic indices | [Artificial Analysis](https://artificialanalysis.ai), as published in OpenRouter's `/api/v1/models` | Layer 1: what the model can solve |
| Overall, coding and instruction-following ratings | [LM Arena](https://lmarena.ai) leaderboard dataset on Hugging Face | Layer 2: what people prefer |
| Parameter count, downloads, pipeline tag | Hugging Face model card | The prior for unmeasured models; spotting non-chat models |
| Context, max output, tools, structured outputs, mandatory reasoning, shutdown date | OpenRouter `/api/v1/models` | Fitness |

## How it is combined

**1. Benchmark quality (0–100).** Each index is divided by the largest value of
that index in the *whole* OpenRouter catalogue, paid models included, so the
scale is "share of the best model anyone sells". Then:

```
0.45 · intelligence + 0.35 · coding + 0.20 · agentic
```

The weights lean towards the people who use free APIs most: developers running
coding assistants, bots and pipelines.

A missing index is **imputed, not dropped**. Dropping it and renormalising the
weights rewards a model for reporting less: a model with only a (good) coding
index would outrank its larger sibling that also reports a poor agentic score.
Missing values are filled from the coding index — intelligence at 0.70× and
agentic at 0.40×, the median ratios across free models that reported all three
— and then discounted by 10 %.

**2. Arena quality (0–100).** A rating of 1200 maps to 0 and 1500 to 100:

```
0.50 · overall + 0.35 · coding + 0.15 · instruction_following
```

Arena names are matched to OpenRouter ids **exactly** after normalising
(dropping the org, `:free`, and suffixes like `-it` or `-nvfp4`), or with only
size and precision tokens appended. Matching by substring is how an old
`qwen3` lends its rating to `qwen3.8-27b`, and how `glm-5.2` picks up
`glm-5.2-max`.

**3. Blend.** Benchmarks measure what a model solves; the Arena measures what
people prefer. They disagree often enough that neither decides alone:

| Available | Quality | `basis` |
|---|---|---|
| Both | `0.55 · benchmarks + 0.45 · arena` | `benchmarks+arena` |
| Benchmarks only | `benchmarks × 0.92` | `benchmarks` |
| Arena only | `arena × 0.92` | `arena` |

**4. Unmeasured models.** New free models often arrive before anyone has
measured them.

- If a sibling in the same family is measured (`ling-3.0-flash-vl` for
  `ling-3.0-flash-sante`), the model inherits 80 % of the family's median
  quality: `basis: "family"`.
- Otherwise it gets a prior from its real size and adoption:
  `4.2 · log2(1 + billions of parameters)`, plus up to 5 points for downloads:
  `basis: "prior"`.

Either way it is capped at 45, so nothing unmeasured outranks a well-measured
model. The table shows these as "estimate".

**5. Fitness.** The quality is multiplied by small factors for what matters
when you build on a model:

| Condition | Factor |
|---|---|
| Context under 32K tokens | × 0.85 |
| Max output under 4K tokens | × 0.80 |
| Always reasons before answering (slow first token) | × 0.85 |
| Supports tool calling | × 1.05 |
| Supports structured outputs | × 1.03 |
| Shutdown date within 7 days | × 0.70 |

`score = quality × fitness`. Both are in the data, so you can re-rank on
quality alone.

## What is left out, on purpose

- **Whether the endpoint is answering right now.** A model that is rate-limited
  this hour is still the better model, and a ranking is read for longer than an
  outage lasts. Live status is its own column.
- **Price.** Everything here is free.
- **Speed.** It depends on the host and the hour, and there is no public,
  per-free-endpoint measurement to build on. ZeroLimitAI's router feeds this
  same function two extra inputs from its own traffic (recent failures, capped
  at 8 points, and time to first token, capped at 20), which is why its
  leaderboard can show lower numbers for the same model. They are left at zero
  here because nobody outside could reproduce them.

## What is not ranked

Models that do not answer in text only (music, image, audio generators),
classifiers and embedding models (by id, and by the Hugging Face pipeline tag
when there is one), and models past their published shutdown date. They are
listed under the table, with the reason in `excluded`.

## Known limits

- Benchmarks and Arena ratings exist for a minority of free models, and lag new
  releases by weeks. Check the `basis` before trusting a number.
- The benchmark indices are one vendor's (Artificial Analysis); the Arena is
  crowd preference with its own biases. Blending them reduces each one's
  blind spots; it does not remove them.
- The weights are judgement calls. They are constants at the top of
  `score.js`, exported, and named — change them and compare.
