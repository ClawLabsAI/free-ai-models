# Free LLM APIs, ranked daily

[🇪🇸 Leer en español](README.es.md)

[![Free models](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FClawLabsAI%2Ffree-ai-models%2Fmain%2Fdata%2Fmodels.json&query=%24.total_free_models&label=free%20models&color=7c3aed&style=flat-square)](data/models.json)
[![Updated daily](https://img.shields.io/badge/updated-daily-4ade80?style=flat-square)](.github/workflows/update.yml)
[![Tests](https://github.com/ClawLabsAI/free-ai-models/actions/workflows/test.yml/badge.svg)](.github/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

**Every free LLM API we can read from a public source, ranked every day by an
open quality score — with who actually serves each model and whether they may
train on your prompts.**

Three things this list does that a plain list of free models does not:

- **It ranks by measured quality.** Published benchmark indices and LM Arena
  ratings, combined by [one small file](scoring/score.js) you can read and
  re-run. Not alphabetical, not by context window, not by hand.
- **It tells you who gets your prompts.** A free model is often served by a
  host with a different data policy from the lab that made it. Each row says
  whether that host may train on what you send, and how long it keeps it.
- **It is data, not just a page.** [`data/models.json`](data/models.json) is
  regenerated daily with every score and every input the score was computed
  from, and a snapshot of each day is kept in [`data/history/`](data/history).

No key needed to read any of it. No scraping: only public, official APIs.

---

## Free models (auto-updated daily)

<!-- TABLE_START -->
> Last updated: **Sat, 10 Oct 2026 09:24:41 UTC** · 16 free chat models · ranked by the [open score](scoring/) in this repo · free-tier limits are the provider's, per account[^or][^poll]
>
> **5 of today's top 10** are served only by providers that may train on your prompts.

| # | Model | Score | Measured by | Trains on your prompts? | Context | Max output | Tools | Input | Today | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Thinking Machines: Inkling** | 68 | benchmarks + Arena | 🔴 may train | 1M | 262K | ✓ | 🖼️ vision, audio | — | [link](https://openrouter.ai/thinkingmachines/inkling:free) |
| 2 | **NVIDIA: Nemotron 3 Ultra** | 66 | benchmarks + Arena | 🔴 may train | 1M | 66K | ✓ | 💬 text | — | [link](https://openrouter.ai/nvidia/nemotron-3-ultra-550b-a55b:free) |
| 3 | **inclusionAI: Ling 3.1 Flash** | 65 | benchmarks | ✅ no · zero retention | 262K | 33K | ✓ | 💬 text | — | [link](https://openrouter.ai/inclusionai/ling-3.1-flash) |
| 4 | **Thinking Machines: Inkling Small** | 65 | benchmarks + Arena | 🔴 may train | 1M | 262K | ✓ | 🖼️ vision, audio | — | [link](https://openrouter.ai/thinkingmachines/inkling-small:free) |
| 5 | **Google: Gemma 4 31B** | 57 | benchmarks + Arena | ✅ no · kept 55 days | 262K | 33K | ✓ | 🖼️ vision, video | ▶ answering | [link](https://openrouter.ai/google/gemma-4-31b-it:free) |
| 6 | **Google: Gemma 4 26B A4B** | 55 | benchmarks + Arena | ✅ no · kept 55 days | 262K | 33K | ✓ | 🖼️ vision, video | ✅ up | [link](https://openrouter.ai/google/gemma-4-26b-a4b-it:free) |
| 7 | **NVIDIA: Nemotron 3 Super** | 46 | benchmarks + Arena | 🔴 may train | 262K | 236K | ✓ | 💬 text | — | [link](https://openrouter.ai/nvidia/nemotron-3-super-120b-a12b:free) |
| 8 | **NVIDIA: Nemotron 3.5 Lightning** | 36 | benchmarks + Arena | 🔴 may train | 1M | 66K | ✓ | 💬 text | — | [link](https://openrouter.ai/nvidia/nemotron-3.5-lightning:free) |
| 9 | **Poolside: Laguna S 2.1** <br><sub>⏳ retiring 2026-10-31</sub> | 34 | estimate (size) | ✅ no · retention unknown | 262K | 33K | ✓ | 💬 text | — | [link](https://openrouter.ai/poolside/laguna-s-2.1:free) |
| 10 | **Poolside: Laguna XS 2.1** <br><sub>⏳ retiring 2026-10-31</sub> | 26 | estimate (size) | ✅ no · retention unknown | 262K | 33K | ✓ | 💬 text | — | [link](https://openrouter.ai/poolside/laguna-xs-2.1:free) |
| 11 | **Cohere: North Mini Code** | 23 | benchmarks | ✅ no · kept 30 days | 256K | 64K | ✓ | 💬 text | ✅ up | [link](https://openrouter.ai/cohere/north-mini-code:free) |
| 12 | **NVIDIA: Nemotron 3 Nano Omni** | 15 | benchmarks | 🔴 may train | 256K | 66K | ✓ | audio, 🖼️ vision, video | — | [link](https://openrouter.ai/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free) |
| 13 | **Apodex: Apodex 1.1 Mini** | 13 | estimate (size) | ✅ no · zero retention | 262K | 236K | ✓ | 💬 text | ✅ up | [link](https://openrouter.ai/apodex/apodex-1.1-mini:free) |
| 14 | **Dots Studio: Dots3-Note Preview** <br><sub>⏳ retiring 2026-12-31</sub> | 13 | estimate (size) | ✅ no · retention unknown | 512K | 461K | ✓ | 🖼️ vision | ✅ up | [link](https://openrouter.ai/dots-studio/dots-3-note-preview:free) |
| 15 | **LiquidAI: LFM2.5-2.6B** | 9 | benchmarks | 🔴 may train | 66K | 8K | ✓ | 💬 text | — | [link](https://openrouter.ai/liquid/lfm-2.5-2.6b:free) |
| 16 | **GPT-OSS 20B Reasoning LLM (OVH)** | — | — | — | — | — | — | 💬 text | — | [link](https://pollinations.ai) |

3 free models that are not chat models (music, image, audio, classifiers):

- [Google: Lyria 3 Pro Preview](https://openrouter.ai/google/lyria-3-pro-preview)
- [Google: Lyria 3 Clip Preview](https://openrouter.ai/google/lyria-3-clip-preview)
- [NVIDIA: Nemotron 3.5 Content Safety (free)](https://openrouter.ai/nvidia/nemotron-3.5-content-safety:free)
<!-- TABLE_END -->

**How to read the table**

- **Score** — 0–100, from [`scoring/score.js`](scoring/score.js). 100 would be
  a free model as good as the best model anyone sells; nothing free is close.
- **Measured by** — what the score rests on: `benchmarks + Arena` is the
  strongest basis, one of the two alone is discounted, and an `estimate` means
  nobody has measured the model yet (it is capped so it cannot outrank a
  measured one).
- **Trains on your prompts?** — the policy of the provider *serving the free
  endpoint on OpenRouter*, from
  [OpenRouter's provider table](https://openrouter.ai/docs/guides/privacy/provider-logging)
  (last read by hand on 2026-10-10), plus how long that provider keeps
  prompts. `—` means we could not establish it; we do not guess.
- **Today** — whether the free endpoint is actually answering. A GitHub Action
  has no traffic to know that, so this one column is borrowed from the
  production health checks of [ZeroLimitAI](https://www.zerolimitai.com)'s
  router, which is built by this repo's maintainers. It only probes the models
  it routes to, and it does not route to providers that may train, so those
  rows show `—`.
- **⏳ retiring** — the provider has published a shutdown date. The model works
  today and stops without further notice on that date.

Free-tier limits are the provider's and belong to the account, not the model:
on OpenRouter every `:free` id shares 20 requests/minute and 50 requests/day
(1,000/day once the account has bought $10 in credits).[^or]

[^or]: OpenRouter, [Free usage limits](https://openrouter.ai/docs/api-reference/limits) (checked 2026-10-10). The cap is global per account — extra API keys or accounts do not widen it.
[^poll]: [Pollinations](https://pollinations.ai) serves an anonymous tier with no API key. Which models are in it changes; this list reads their live catalogue every day and keeps the models marked `tier: "anonymous"`. They are listed unscored: no public benchmark data is attached to them.

### About the data-use column

Free inference is free because someone gets something back, and sometimes that
something is your prompts. Whether it matters is your call; the point is to
know before you send a customer's data.

- The column describes the **free endpoint on OpenRouter**. The same model
  called somewhere else is under that provider's own terms, which can differ:
  a provider's own unpaid tier is not necessarily covered by what OpenRouter's
  table says about the endpoint it serves. Read the terms of wherever you call.
- OpenRouter describes its table as its best knowledge of each provider's
  policy, not a definitive source. This repo copies it for the providers that
  serve free models ([`scoring/sources.js`](scoring/sources.js), with the date
  it was read). If a row is wrong, [open an issue](../../issues/new/choose).
- On OpenRouter you can refuse those providers per request, so a model served
  by several hosts only goes to the ones that do not train:

```json
{
  "model": "google/gemma-4-31b-it:free",
  "provider": { "data_collection": "deny" },
  "messages": [{ "role": "user", "content": "Hello!" }]
}
```

---

## Use the data

The file is plain JSON at a stable URL:

```
https://raw.githubusercontent.com/ClawLabsAI/free-ai-models/main/data/models.json
```

The best free model today that supports tools and is not served by a provider
that may train:

```bash
curl -s https://raw.githubusercontent.com/ClawLabsAI/free-ai-models/main/data/models.json \
  | jq -r '[.models[] | select(.rank and .supports_tools and .data_use == "no-training")][0].id'
```

```js
const { models } = await (await fetch(
  "https://raw.githubusercontent.com/ClawLabsAI/free-ai-models/main/data/models.json",
)).json();

// A fallback chain: ranked, tool-capable, no training, best first.
const chain = models
  .filter((m) => m.rank && m.supports_tools && m.data_use === "no-training")
  .map((m) => m.id);
```

```python
import requests
from openai import OpenAI

models = requests.get(
    "https://raw.githubusercontent.com/ClawLabsAI/free-ai-models/main/data/models.json"
).json()["models"]
best = next(m["id"] for m in models if m["rank"] and m["data_use"] == "no-training")

client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key="YOUR_OPENROUTER_KEY")
print(client.chat.completions.create(
    model=best, messages=[{"role": "user", "content": "Hello!"}]
).choices[0].message.content)
```

The ids are OpenRouter ids, so they work as-is anywhere that takes one: the
OpenAI SDKs pointed at OpenRouter, LiteLLM (`openrouter/<id>`), and coding
tools such as Cline, Roo Code, Continue, Aider and OpenCode.

### Fields

| Field | Meaning |
|---|---|
| `id`, `name`, `provider` | The model's id on its source, its display name, and the lab that made it |
| `kind` | `chat` (answers in text) or `other` (music, image, audio generators) |
| `rank`, `score` | Position and 0–100 score among today's free chat models; `null` if not ranked |
| `quality` | The score before the fitness factor (context, output, tools, shutdown date) |
| `basis` | `benchmarks+arena`, `benchmarks`, `arena`, `family` or `prior` — what the score rests on |
| `notes` | Why the score is what it is: imputed benchmarks, no tool calling, expires in N days… |
| `excluded` | Why a model is not ranked (a classifier, not text-only, expired), or `null` |
| `benchmarks` | Artificial Analysis indices as published by OpenRouter: `intelligence`, `coding`, `agentic` |
| `arena` | LM Arena ratings: `overall`, `coding`, `instruction_following`, `spanish`, and `votes` |
| `hf` | From the Hugging Face model card: `paramsB` (billions of parameters), `downloads`, `pipelineTag` |
| `served_by` | The provider(s) behind the free endpoint |
| `data_use` | `no-training`, `mixed`, `may-train`, or `null` when unknown |
| `retention` | How long that provider keeps prompts: `"zero"`, days, `"unknown"`, or `null` |
| `context_window`, `max_output` | Tokens |
| `supports_tools`, `supports_structured_outputs` | As declared by the endpoint |
| `modalities` | Inputs and outputs: text, image, audio, video, file |
| `expires` | Shutdown date published by the provider, or `null` |
| `health`, `answering_now` | Live status from ZeroLimitAI's router; `null` when it does not probe the model |
| `zo_score`, `zo_rank` | Aliases of `score` (rounded) and `rank`, kept for readers written before 2026-10-10 |

The top-level `scoring` object records the benchmark maxima used that day and
whether the Arena table was available, so any day's ranking can be recomputed
from its own snapshot.

---

## How the score works

The whole method is [`scoring/score.js`](scoring/score.js) (pure: no network,
no clock) and its inputs come from [`scoring/sources.js`](scoring/sources.js).
The longer explanation, with every weight and why it is what it is, is in
[`scoring/README.md`](scoring/README.md). In short:

1. **Benchmarks** — Artificial Analysis intelligence, coding and agentic
   indices, normalised to the best model in the whole catalogue (paid ones
   included). A missing index is imputed at a discount, never dropped, so
   reporting less cannot raise a score.
2. **Preference** — LM Arena ratings (overall, coding, instruction following).
3. With both, they are blended 55/45; with one, it is discounted 8 %.
4. **No measurement at all** — the model inherits 80 % of a measured sibling
   in its family, or gets a prior from its real size and downloads, capped
   below any well-measured model.
5. **Fitness** — small factors for what matters when you build on a model:
   context under 32K, output under 4K, no tool calling, a shutdown date within
   a week.

Whether a model is answering *right now* is deliberately not in the score: a
model that is rate-limited this hour is still the better model.

```bash
git clone https://github.com/ClawLabsAI/free-ai-models && cd free-ai-models
npm ci
npm test          # the scoring rules
npm run update    # rebuild today's ranking from the public sources
```

Disagree with a weight? Change it, run it, and open a pull request with the
ranking it produces. That is what the file is for.

---

## Where to call these models

For anyone wiring up a provider directly. All of them speak the OpenAI shape
unless noted, so `base_url` is the only change.

| Provider | Base URL | Free tier | Key | Checked |
|---|---|---|---|---|
| [OpenRouter](https://openrouter.ai/keys) | `https://openrouter.ai/api/v1` | Every `:free` model: 20 RPM, 50 RPD per account (1,000 RPD after $10 in credits) [^or] | Yes, no card | 2026-10-10 |
| [Pollinations](https://pollinations.ai) | `https://text.pollinations.ai` | Anonymous tier, rotating model list [^poll] | No key | 2026-09-23 |
| [OVHcloud AI Endpoints](https://www.ovhcloud.com/en/public-cloud/ai-endpoints/catalog/) | `https://oai.endpoints.kepler.ai.cloud.ovh.net/v1` | Catalogue is public and keyless; the anonymous chat tier is 2 RPM per IP and in practice answers `429` most of the time [^ovh] | No key | 2026-09-23 |
| [Groq](https://console.groq.com/keys) | `https://api.groq.com/openai/v1` | Free plan, per-model limits — [published table](https://console.groq.com/docs/rate-limits) | Yes, no card | — |
| [Google AI Studio](https://aistudio.google.com/app/apikey) | `https://generativelanguage.googleapis.com/v1beta/openai` | Free tier per model — [published limits](https://ai.google.dev/gemini-api/docs/rate-limits) | Yes, no card | — |
| [Cerebras](https://cloud.cerebras.ai) | `https://api.cerebras.ai/v1` | Free tier — [published limits](https://inference-docs.cerebras.ai/support/rate-limits) | Yes | — |
| [Cloudflare Workers AI](https://dash.cloudflare.com/profile/api-tokens) | `https://api.cloudflare.com/client/v4/accounts/{id}/ai/v1` | 10,000 Neurons/day shared across all models — [pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/) | Yes | — |

A blank **Checked** means we link the provider's own limits page but have not
verified the numbers ourselves — treat their page as the source of truth.
Free tiers are meant for building and trying things; read each provider's
terms before putting one behind a product.

[^ovh]: OVHcloud publishes a permanent anonymous tier (no signup, no key) limited to 2 requests/minute per IP per model. Their `/v1/models` catalogue answers without a key; on 2026-09-23 four chat completions from two different models, spaced over several minutes, all returned `API rate limit exceeded`.

---

## How the tracking works

```
GitHub Actions (daily, 04:00 UTC)
        │
        ▼
 scripts/fetch-models.js
        │
        ├── OpenRouter /api/v1/models            catalogue, prices, benchmark indices
        ├── OpenRouter /models/{id}/endpoints    who serves each free endpoint
        ├── LM Arena leaderboard (Hugging Face)  human-preference ratings
        ├── Hugging Face /api/models/{id}        real size and downloads
        ├── Pollinations /models                 anonymous tier
        │
        ├── scoring/score.js                     rank
        │
        └── writes  data/models.json · data/history/YYYY-MM-DD.json · README tables
```

Watch → Custom → **Releases** to get one summary a week (new models, retired
models, changes at the top) instead of a daily commit.

---

## Contributing

- **A model is missing or a row is wrong** — it is read from the provider's own
  API, so it usually fixes itself within a day. If it does not,
  [open an issue](../../issues/new/choose).
- **A new provider** — welcome if it can be read the same way: live, from its
  own public API. See [CONTRIBUTING.md](CONTRIBUTING.md).
- **The score** — pull requests that change a weight should say what ranking
  the change produces and why that ranking is better.

---

## Who maintains this

The team behind [ZeroLimitAI](https://www.zerolimitai.com), a hosted AI app and
API whose router ranks free models with this same function. We keep the list
accurate because our own product depends on it; the list itself stays MIT,
provider-neutral and useful without us — a model belongs here whether or not
we route to it, and several of the highest-ranked ones we do not.

## Related projects

- [awesome-free-llm-apis](https://github.com/mnfst/awesome-free-llm-apis) — a wider, hand-curated catalogue of providers with free tiers
- [FreeLLMAPI](https://github.com/tashfeenahmed/freellmapi) and [free-claude-code](https://github.com/Alishahryar1/free-claude-code) — self-hosted routers that stack free tiers using your own keys
- [LiteLLM](https://github.com/BerriAI/litellm) — one SDK and proxy for every provider
- [LM Arena](https://lmarena.ai) and [Artificial Analysis](https://artificialanalysis.ai) — where the measurements come from

## License

MIT — use freely, attribution appreciated.
