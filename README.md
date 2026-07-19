# 🆓 Free AI Models

[![Models](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FClawLabsAI%2Ffree-ai-models%2Fmain%2Fdata%2Fmodels.json&query=%24.total_free_models&label=free%20models&color=7c3aed&style=flat-square)](data/models.json)
[![Updated daily](https://img.shields.io/badge/updated-daily-4ade80?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

**A daily-updated, community-maintained list of every free AI model (free LLM API) available right now.**

No paywalls. No API keys required to view. Updated automatically every 24 hours by GitHub Actions pulling from [OpenRouter](https://openrouter.ai), [Pollinations AI](https://pollinations.ai), and other public sources.

> **Just want to call them?** Skip the integration work — there's an [OpenAI-compatible free API](#one-api-for-whichever-model-is-1-today) that auto-routes to the best model on this list.

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

→ Raw data: [`data/models.json`](data/models.json)

---

## Free models (auto-updated daily)

<!-- TABLE_START -->
> Last updated: **Sun, 19 Jul 2026 06:32:29 UTC** · 27 models tracked

| # | Model | Provider | Context | Modalities | Rate Limit | Source |
|---|-------|----------|---------|------------|------------|--------|
| 1 | **Google: Lyria 3 Pro Preview** | Google | 1M | 💬 text, 🖼️ vision, audio | varies | [link](https://openrouter.ai/google/lyria-3-pro-preview) |
| 2 | **Google: Lyria 3 Clip Preview** | Google | 1M | 💬 text, 🖼️ vision, audio | varies | [link](https://openrouter.ai/google/lyria-3-clip-preview) |
| 3 | **Qwen: Qwen3 Coder 480B A35B (free)** | Qwen | 1M | 💬 text | 20 req/min | [link](https://openrouter.ai/qwen/qwen3-coder:free) |
| 4 | **Gemini 2.0 Flash** | Pollinations AI | 1M | 💬 text, 🖼️ vision | unlimited (no auth) | [link](https://pollinations.ai) |
| 5 | **NVIDIA: Nemotron 3 Ultra (free)** | Nvidia | 1M | 💬 text | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-3-ultra-550b-a55b:free) |
| 6 | **NVIDIA: Nemotron 3 Super (free)** | Nvidia | 1M | 💬 text | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-3-super-120b-a12b:free) |
| 7 | **Tencent: Hy3 (free)** | Tencent | 262K | 💬 text | varies | [link](https://openrouter.ai/tencent/hy3:free) |
| 8 | **Poolside: Laguna XS 2.1 (free)** | Poolside | 262K | 💬 text | varies | [link](https://openrouter.ai/poolside/laguna-xs-2.1:free) |
| 9 | **Poolside: Laguna M.1 (free)** | Poolside | 262K | 💬 text | varies | [link](https://openrouter.ai/poolside/laguna-m.1:free) |
| 10 | **Google: Gemma 4 26B A4B  (free)** | Google | 262K | 🖼️ vision, 💬 text, video | varies | [link](https://openrouter.ai/google/gemma-4-26b-a4b-it:free) |
| 11 | **Google: Gemma 4 31B (free)** | Google | 262K | 🖼️ vision, 💬 text, video | varies | [link](https://openrouter.ai/google/gemma-4-31b-it:free) |
| 12 | **Qwen: Qwen3 Next 80B A3B Instruct (free)** | Qwen | 262K | 💬 text | 20 req/min | [link](https://openrouter.ai/qwen/qwen3-next-80b-a3b-instruct:free) |
| 13 | **Cohere: North Mini Code (free)** | Cohere | 256K | 💬 text | varies | [link](https://openrouter.ai/cohere/north-mini-code:free) |
| 14 | **NVIDIA: Nemotron 3 Nano Omni (free)** | Nvidia | 256K | 💬 text, audio, 🖼️ vision, video | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free) |
| 15 | **NVIDIA: Nemotron 3 Nano 30B A3B (free)** | Nvidia | 256K | 💬 text | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-3-nano-30b-a3b:free) |
| 16 | **Free Models Router** | Openrouter | 200K | 💬 text, 🖼️ vision | varies | [link](https://openrouter.ai/openrouter/free) |
| 17 | **OpenAI: gpt-oss-20b (free)** | Openai | 131K | 💬 text | varies | [link](https://openrouter.ai/openai/gpt-oss-20b:free) |
| 18 | **Meta: Llama 3.3 70B Instruct (free)** | Meta llama | 131K | 💬 text | 30 req/min | [link](https://openrouter.ai/meta-llama/llama-3.3-70b-instruct:free) |
| 19 | **Meta: Llama 3.2 3B Instruct (free)** | Meta llama | 131K | 💬 text | 30 req/min | [link](https://openrouter.ai/meta-llama/llama-3.2-3b-instruct:free) |
| 20 | **Nous: Hermes 3 405B Instruct (free)** | Nousresearch | 131K | 💬 text | 20 req/min | [link](https://openrouter.ai/nousresearch/hermes-3-llama-3.1-405b:free) |
| 21 | **NVIDIA: Nemotron 3.5 Content Safety (free)** | Nvidia | 128K | 💬 text, 🖼️ vision | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-3.5-content-safety:free) |
| 22 | **NVIDIA: Nemotron Nano 12B 2 VL (free)** | Nvidia | 128K | 🖼️ vision, 💬 text, video | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-nano-12b-v2-vl:free) |
| 23 | **NVIDIA: Nemotron Nano 9B V2 (free)** | Nvidia | 128K | 💬 text | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-nano-9b-v2:free) |
| 24 | **Mistral Nemo** | Pollinations AI | 128K | 💬 text | unlimited (no auth) | [link](https://pollinations.ai) |
| 25 | **Mistral Small 3.2** | Pollinations AI | 128K | 💬 text | unlimited (no auth) | [link](https://pollinations.ai) |
| 26 | **GPT-4o** | Pollinations AI | 128K | 💬 text, 🖼️ vision | unlimited (no auth) | [link](https://pollinations.ai) |
| 27 | **Venice: Uncensored (free)** | Cognitivecomputations | 33K | 💬 text | varies | [link](https://openrouter.ai/cognitivecomputations/dolphin-mistral-24b-venice-edition:free) |
<!-- TABLE_END -->

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
every request to the top-ranked free model from this list — with automatic
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

## Contributing

Found a free model we're missing? Open a PR editing `EXTRA_PROVIDERS` in [`scripts/fetch-models.js`](scripts/fetch-models.js).

**Guidelines:**
- Model must be genuinely free (no hidden fees, no trial-only)
- Must have a public API endpoint
- Include rate limit info if known

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## Related projects

- [openrouter.ai](https://openrouter.ai) — API gateway for 200+ models
- [lmarena.ai](https://lmarena.ai) — LLM battle arena & ELO rankings
- [ZeroLimitAI](https://zerolimitai.com) — AI assistant powered by this tracker

---

## License

MIT — use freely, attribution appreciated.
