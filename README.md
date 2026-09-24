# 🆓 Free AI Models

[🇪🇸 Leer en español](README.es.md)

[![Models](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FClawLabsAI%2Ffree-ai-models%2Fmain%2Fdata%2Fmodels.json&query=%24.total_free_models&label=free%20models&color=7c3aed&style=flat-square)](data/models.json)
[![Updated daily](https://img.shields.io/badge/updated-daily-4ade80?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

**A daily-updated, community-maintained list of every free AI model (free LLM API) available right now.**

No paywalls. No API key required to browse. Updated automatically every 24 hours by GitHub Actions pulling from [OpenRouter](https://openrouter.ai), [Pollinations AI](https://pollinations.ai), and other public sources.

### [↓ See the full list of free models](#free-models-auto-updated-daily)

> **Don't want to wire up a dozen providers yourself?**
>
> [**ZeroLimitAI**](https://www.zerolimitai.com/developers) — built by the people who maintain this list — gives you **one OpenAI-compatible endpoint** that auto-routes every request to whichever free model is answering best right now, with automatic failover when one hits its rate limit.
>
> [![Get a free API key](https://img.shields.io/badge/Get%20a%20free%20API%20key-OpenAI--compatible-7c3aed?style=for-the-badge)](https://www.zerolimitai.com/developers)
> &nbsp;
> [![Or just chat](https://img.shields.io/badge/Or%20just%20chat-no%20setup-4ade80?style=for-the-badge)](https://www.zerolimitai.com/register)
>
> <sub>Free key · no card · $0 inference — [see how it works ↓](#one-api-for-whichever-model-is-1-today)</sub>

---

## Why this exists

The free AI model landscape changes **every week** — models get added, rate limits change, providers shut down without notice. This repo tracks it all automatically so you don't have to.

**Use it to:**
- Find the best free model for your current task
- Track which providers offer the most generous free tiers
- Get notified of new free models via GitHub Watch → Releases
- Build your own routing logic on top of real-time data

---

## What's in the data

Each model entry includes:

| Field | Description |
|-------|-------------|
| `id` | Full model ID (e.g. `google/gemini-2.5-flash:free`) |
| `name` | Human-readable name |
| `provider` | Who made the model |
| `context_window` | Max tokens in context |
| `max_output` | Max tokens per response |
| `modalities` | text / vision / files |
| `rate_limit` | Known rate limit (req/min or tokens/day) |
| `source` | Where to access it |
| `kind` | `chat` (text out) or `other` (music, image, audio generators) |
| `zo_score` | 0–100 quality score relative to the best free model, from [ZeroOptimize](https://www.zerolimitai.com/leaderboard); `null` if unranked |
| `health` | `ok` / `sick` / `dead` — today's result of ZeroLimitAI's production health check; `null` if not probed |

→ Raw data: [`data/models.json`](data/models.json)

---

## Free models (auto-updated daily)

<!-- TABLE_START -->
> Last updated: **Thu, 24 Sep 2026 09:07:36 UTC** · 23 chat models · ranked by [ZeroOptimize](https://www.zerolimitai.com/leaderboard) score, then context window · rate limits are the provider's, per account[^or][^poll]

| # | Model | Provider | Context | Max output | Modalities | Rate Limit | Score | Today | Source |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Qwen: Qwen3.8 27B (free)** | Qwen | 262K | 236K | 💬 text, 🖼️ vision, video | 20 RPM · 50 RPD | 100 | ⚠️ degraded | [link](https://openrouter.ai/qwen/qwen3.8-27b:free) |
| 2 | **inclusionAI: Ling 3.0 Flash Fin (free)** | Inclusionai | 262K | 33K | 💬 text | 20 RPM · 50 RPD | 59 | ✅ up | [link](https://openrouter.ai/inclusionai/ling-3.0-flash-fin:free) |
| 3 | **Z.ai: GLM 5.2 (free)** | Z ai | 33K | 29K | 💬 text | 20 RPM · 50 RPD | 56 | ✅ up | [link](https://openrouter.ai/z-ai/glm-5.2:free) |
| 4 | **inclusionAI: Ling 3.0 Flash Sante (free)** | Inclusionai | 262K | 33K | 💬 text | 20 RPM · 50 RPD | 47 | ✅ up | [link](https://openrouter.ai/inclusionai/ling-3.0-flash-sante:free) |
| 5 | **Google: Gemma 4 26B A4B  (free)** | Google | 262K | 33K | 🖼️ vision, 💬 text, video | 20 RPM · 50 RPD | 30 | ✅ up | [link](https://openrouter.ai/google/gemma-4-26b-a4b-it:free) |
| 6 | **Cohere: North Mini Code (free)** | Cohere | 256K | 64K | 💬 text | 20 RPM · 50 RPD | 27 | ✅ up | [link](https://openrouter.ai/cohere/north-mini-code:free) |
| 7 | **Google: Gemma 4 31B (free)** | Google | 262K | 33K | 🖼️ vision, 💬 text, video | 20 RPM · 50 RPD | 14 | ✅ up | [link](https://openrouter.ai/google/gemma-4-31b-it:free) |
| 8 | **Nex AGI: Nex-N2.5-Mini (free)** <br><sub>⏳ retiring 2026-09-25</sub> | Nex agi | 262K | 236K | 💬 text, 🖼️ vision | 20 RPM · 50 RPD | 11 | ✅ up | [link](https://openrouter.ai/nex-agi/nex-n2.5-mini:free) |
| 9 | **Nex AGI: Nex-N2.5-Pro (free)** <br><sub>⏳ retiring 2026-09-25</sub> | Nex agi | 262K | 236K | 💬 text, 🖼️ vision | 20 RPM · 50 RPD | 10 | ✅ up | [link](https://openrouter.ai/nex-agi/nex-n2.5-pro:free) |
| 10 | **Dots Studio: Dots3-Note Preview (free)** <br><sub>⏳ retiring 2026-12-31</sub> | Dots studio | 512K | 461K | 💬 text, 🖼️ vision | 20 RPM · 50 RPD | 6 | ✅ up | [link](https://openrouter.ai/dots-studio/dots-3-note-preview:free) |
| 11 | **Thinking Machines: Inkling Small (free)** | Thinkingmachines | 1M | 262K | 💬 text, 🖼️ vision, audio | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/thinkingmachines/inkling-small:free) |
| 12 | **Thinking Machines: Inkling (free)** | Thinkingmachines | 1M | 262K | 💬 text, 🖼️ vision, audio | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/thinkingmachines/inkling:free) |
| 13 | **Space Bunny Alpha** <br><sub>⏳ retiring 2098-12-31</sub> | Stealth | 1M | 524K | 💬 text, 🖼️ vision, video | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/stealth/space-bunny-alpha) |
| 14 | **NVIDIA: Nemotron 3.5 Lightning (free)** | Nvidia | 1M | 66K | 💬 text | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/nvidia/nemotron-3.5-lightning:free) |
| 15 | **NVIDIA: Nemotron 3 Ultra (free)** | Nvidia | 1M | 66K | 💬 text | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/nvidia/nemotron-3-ultra-550b-a55b:free) |
| 16 | **Poolside: Laguna S 2.1 (free)** | Poolside | 262K | 33K | 💬 text | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/poolside/laguna-s-2.1:free) |
| 17 | **Poolside: Laguna XS 2.1 (free)** | Poolside | 262K | 33K | 💬 text | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/poolside/laguna-xs-2.1:free) |
| 18 | **NVIDIA: Nemotron 3 Super (free)** | Nvidia | 262K | 236K | 💬 text | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/nvidia/nemotron-3-super-120b-a12b:free) |
| 19 | **NVIDIA: Nemotron 3 Nano Omni (free)** | Nvidia | 256K | 66K | 💬 text, audio, 🖼️ vision, video | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free) |
| 20 | **Free Models Router** | Openrouter | 200K | — | 💬 text, 🖼️ vision | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/openrouter/free) |
| 21 | **NVIDIA: Nemotron 3.5 Content Safety (free)** | Nvidia | 128K | 8K | 💬 text, 🖼️ vision | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/nvidia/nemotron-3.5-content-safety:free) |
| 22 | **LiquidAI: LFM2.5-2.6B (free)** | Liquid | 66K | 8K | 💬 text | 20 RPM · 50 RPD | — | — | [link](https://openrouter.ai/liquid/lfm-2.5-2.6b:free) |
| 23 | **GPT-OSS 20B Reasoning LLM (OVH)** | Pollinations AI | — | — | 💬 text | anonymous tier (no key) | — | — | [link](https://pollinations.ai) |

2 free models that are not chat models (music, image, audio generation):

- [Google: Lyria 3 Pro Preview](https://openrouter.ai/google/lyria-3-pro-preview)
- [Google: Lyria 3 Clip Preview](https://openrouter.ai/google/lyria-3-clip-preview)
<!-- TABLE_END -->

**How to read the table.** `Context` and `Max output` are tokens. `Rate Limit`
is the *provider's* limit for free models, not the model's — on OpenRouter it
belongs to the account and is identical for every `:free` id. `Score` is the
ZeroOptimize quality score (0–100, relative to the best free model today) and
`Today` is the result of a real production health check, not a status page. A
model tagged **⏳ retiring** has a shutdown date published by its provider: it
still works today, and it will stop without further notice on that date.

**Data policy.** Free inference is free because someone gets something back.
Of the 91 providers OpenRouter lists, four may train on the prompts they
receive — DeepSeek, Liquid, NVIDIA and Thinking Machines
([their table](https://openrouter.ai/docs/guides/features/privacy-and-logging),
checked 2026-09-23). Whether that matters is your call; what matters is knowing
it before you send a customer's data. ZeroLimitAI's router refuses those
providers on every request, which is why a handful of otherwise-good models are
missing from its chain.

| Term | Meaning |
|------|---------|
| RPM | Requests per minute |
| RPD | Requests per day |
| TPM | Tokens per minute |
| TPD | Tokens per day |

[^or]: OpenRouter, [Free usage limits](https://openrouter.ai/docs/api-reference/limits) (checked 2026-09-23): models whose id ends in `:free` are capped at 20 requests/minute and 50 requests/day, rising to 1,000/day once the account has purchased $10 in credits. The cap is global per account — extra API keys do not widen it — and `GET /api/v1/key` reports the day's counter in `free_model_daily_requests`.
[^poll]: [Pollinations](https://pollinations.ai) serves an anonymous tier with no API key. Which models are in it changes; this list reads their live catalogue every day and keeps only the models they currently mark `tier: "anonymous"`.

---

## Where to call these models

The table above answers *what is free*. This one answers *where*, for anyone
who would rather wire up a provider directly than use a router. All of them
speak the OpenAI shape unless noted, so `base_url` is the only change.

| Provider | Base URL | Free tier | Key | Checked |
|---|---|---|---|---|
| [OpenRouter](https://openrouter.ai/keys) | `https://openrouter.ai/api/v1` | Every `:free` model: 20 RPM, 50 RPD per account (1,000 RPD after $10 in credits) [^or] | Yes, no card | 2026-09-23 |
| [Pollinations](https://pollinations.ai) | `https://text.pollinations.ai` | Anonymous tier, rotating model list [^poll] | No key | 2026-09-23 |
| [OVHcloud AI Endpoints](https://www.ovhcloud.com/en/public-cloud/ai-endpoints/catalog/) | `https://oai.endpoints.kepler.ai.cloud.ovh.net/v1` | Catalogue is public and keyless; the anonymous chat tier is 2 RPM per IP and in practice answers `429` most of the time [^ovh] | No key | 2026-09-23 |
| [Groq](https://console.groq.com/keys) | `https://api.groq.com/openai/v1` | Free plan, per-model limits — [published table](https://console.groq.com/docs/rate-limits) | Yes, no card | — |
| [Google AI Studio](https://aistudio.google.com/app/apikey) | `https://generativelanguage.googleapis.com/v1beta/openai` | Free tier per model — [published limits](https://ai.google.dev/gemini-api/docs/rate-limits) | Yes, no card | — |
| [Cerebras](https://cloud.cerebras.ai) | `https://api.cerebras.ai/v1` | Free tier — [published limits](https://inference-docs.cerebras.ai/support/rate-limits) | Yes | — |
| [Cloudflare Workers AI](https://dash.cloudflare.com/profile/api-tokens) | `https://api.cloudflare.com/client/v4/accounts/{id}/ai/v1` | 10,000 Neurons/day shared across all models — [pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/) | Yes | — |
| [ZeroLimitAI](https://www.zerolimitai.com/developers) | `https://www.zerolimitai.com/api/v1` | 100 calls/day for the first week, then 50 calls/day forever; key never expires | Yes, no card | 2026-09-23 |

A blank **Checked** means we list the provider and link its own limits page,
but have not verified the numbers ourselves — treat the provider's page as the
source of truth, and [open an issue](../../issues/new/choose) if it has moved.

For a wider, hand-curated catalogue of providers (including several this list
does not track), see [awesome-free-llm-apis](https://github.com/mnfst/awesome-free-llm-apis).

[^ovh]: OVHcloud publishes a permanent anonymous tier (no signup, no key) limited to 2 requests/minute per IP per model. Their `/v1/models` catalogue does answer without a key; on 2026-09-23 four chat completions from two different models, spaced over several minutes, all returned `API rate limit exceeded`. Useful to know the endpoint exists; not something to put in front of users without a key.

---

## How the tracking works

```
GitHub Actions (daily 04:00 UTC)
         │
         ▼
  fetch-models.js
         │
         ├── GET openrouter.ai/api/v1/models  (no auth required)
         │   └── filter: pricing.prompt === "0"
         │
         ├── Static list: Pollinations AI, etc.
         │
         └── Writes:
             ├── data/models.json       ← current snapshot
             ├── data/history/YYYY-MM-DD.json
             └── README.md              ← table regenerated
```

No scraping, no reverse engineering — only public official APIs.

---

## One API for whichever model is #1 today

Tracking the list is the easy part — keeping your app pointed at the current
best free model (as rate limits shift and providers come and go) is the pain.

**[ZeroLimitAI](https://www.zerolimitai.com/developers)** does it for you with an
**OpenAI-compatible** endpoint. Send `model: "auto"` and ZeroOptimize™ routes
every request to the top-ranked free model available — with automatic
failover when one rate-limits. Change two lines, pay $0:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://www.zerolimitai.com/api/v1",
    api_key="YOUR_FREE_KEY",
)

# ZeroOptimize™ picks the best free model from this tracker, per request
resp = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(resp.choices[0].message.content)
```

[![Free API key](https://img.shields.io/badge/Get%20a%20free%20API%20key-OpenAI--compatible-7c3aed?style=for-the-badge)](https://www.zerolimitai.com/developers)
&nbsp;
[![Try the chat](https://img.shields.io/badge/Or%20just%20chat-no%20setup-4ade80?style=for-the-badge)](https://www.zerolimitai.com/register)

---

## Why the router often answers with a model that isn't on this page

If you use that endpoint and check which model replied, it will regularly be one
you can't find in the table above. That's expected, and it's the whole point.

**This repo answers "what free models exist?"** It reads the public catalogues —
the OpenRouter API and Pollinations — once a day and lists everything priced at
$0. That's a catalogue.

**The router answers "which of them will actually reply, right now?"** It scores
every candidate with [ZeroOptimize v3](https://www.zerolimitai.com/leaderboard) —
published benchmark indices and LM Arena ratings for quality, then context,
output ceiling, tool support and its own production latency — and drops any that
start failing, retrying the next one automatically.

So the two lists diverge for two reasons: **different sources, and different
questions.** A model can sit on this page and still be unusable today — rate
limited down to nothing, quietly renamed, or an endpoint that has stopped
serving. Finding that out is the part that costs you an afternoon, and it's the
part worth automating.

Use this list to see the landscape. Use the router when you'd rather not
maintain the plumbing yourself.

---

## Contributing

Found a free model we're missing? Open a PR editing `EXTRA_PROVIDERS` in [`scripts/fetch-models.js`](scripts/fetch-models.js).

**Guidelines:**
- Model must be genuinely free (no hidden fees, no trial-only)
- Must have a public API endpoint
- Include rate limit info if known

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## Who maintains this

This tracker is built and kept current by the team behind
[**ZeroLimitAI**](https://www.zerolimitai.com), a multi-model AI platform whose
router — ZeroOptimize™ — runs on exactly this data. Keeping the list accurate
isn't a side project for us: it's what our own product depends on every day.

The data stays free, MIT-licensed and provider-neutral. If a model belongs here,
it goes in whether or not we route to it.

---

## Related projects

- [openrouter.ai](https://openrouter.ai) — API gateway for 200+ models
- [lmarena.ai](https://lmarena.ai) — LLM battle arena & ELO rankings
- [ZeroLimitAI](https://www.zerolimitai.com) — free AI chat + an OpenAI-compatible API that routes across this list

---

## License

MIT — use freely, attribution appreciated.

---

<div align="center">
<sub>Maintained by <a href="https://www.zerolimitai.com"><b>ZeroLimitAI</b></a> ·
<a href="https://www.zerolimitai.com/developers">Free API</a> ·
<a href="https://www.zerolimitai.com/register">Try the chat</a></sub>
</div>
