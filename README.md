# 🆓 Free AI Models

[![Models](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FClawLabsAI%2Ffree-ai-models%2Fmain%2Fdata%2Fmodels.json&query=%24.total_free_models&label=free%20models&color=7c3aed&style=flat-square)](data/models.json)
[![Updated daily](https://img.shields.io/badge/updated-daily-4ade80?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

**A daily-updated, community-maintained list of every free AI model available right now.**

No paywalls. No API keys required to view. Updated automatically every 24 hours by GitHub Actions pulling from [OpenRouter](https://openrouter.ai), [Pollinations AI](https://pollinations.ai), and other public sources.

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
> Last updated: **Fri, 05 Jun 2026 08:10:01 UTC** · 31 models tracked

| # | Model | Provider | Context | Modalities | Rate Limit | Source |
|---|-------|----------|---------|------------|------------|--------|
| 1 | **Owl Alpha** | Openrouter | 1M | 💬 text | varies | [link](https://openrouter.ai/openrouter/owl-alpha) |
| 2 | **Google: Lyria 3 Pro Preview** | Google | 1M | 💬 text, 🖼️ vision, audio | varies | [link](https://openrouter.ai/google/lyria-3-pro-preview) |
| 3 | **Google: Lyria 3 Clip Preview** | Google | 1M | 💬 text, 🖼️ vision, audio | varies | [link](https://openrouter.ai/google/lyria-3-clip-preview) |
| 4 | **Qwen: Qwen3 Coder 480B A35B (free)** | Qwen | 1M | 💬 text | 20 req/min | [link](https://openrouter.ai/qwen/qwen3-coder:free) |
| 5 | **Gemini 2.0 Flash** | Pollinations AI | 1M | 💬 text, 🖼️ vision | unlimited (no auth) | [link](https://pollinations.ai) |
| 6 | **NVIDIA: Nemotron 3 Ultra (free)** | Nvidia | 1M | 💬 text | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-3-ultra-550b-a55b:free) |
| 7 | **NVIDIA: Nemotron 3 Super (free)** | Nvidia | 1M | 💬 text | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-3-super-120b-a12b:free) |
| 8 | **Poolside: Laguna XS.2 (free)** | Poolside | 262K | 💬 text | varies | [link](https://openrouter.ai/poolside/laguna-xs.2:free) |
| 9 | **Poolside: Laguna M.1 (free)** | Poolside | 262K | 💬 text | varies | [link](https://openrouter.ai/poolside/laguna-m.1:free) |
| 10 | **MoonshotAI: Kimi K2.6 (free)** | Moonshotai | 262K | 💬 text, 🖼️ vision | varies | [link](https://openrouter.ai/moonshotai/kimi-k2.6:free) |
| 11 | **Google: Gemma 4 26B A4B  (free)** | Google | 262K | 🖼️ vision, 💬 text, video | varies | [link](https://openrouter.ai/google/gemma-4-26b-a4b-it:free) |
| 12 | **Google: Gemma 4 31B (free)** | Google | 262K | 🖼️ vision, 💬 text, video | varies | [link](https://openrouter.ai/google/gemma-4-31b-it:free) |
| 13 | **Qwen: Qwen3 Next 80B A3B Instruct (free)** | Qwen | 262K | 💬 text | 20 req/min | [link](https://openrouter.ai/qwen/qwen3-next-80b-a3b-instruct:free) |
| 14 | **NVIDIA: Nemotron 3 Nano Omni (free)** | Nvidia | 256K | 💬 text, audio, 🖼️ vision, video | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free) |
| 15 | **NVIDIA: Nemotron 3 Nano 30B A3B (free)** | Nvidia | 256K | 💬 text | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-3-nano-30b-a3b:free) |
| 16 | **Free Models Router** | Openrouter | 200K | 💬 text, 🖼️ vision | varies | [link](https://openrouter.ai/openrouter/free) |
| 17 | **OpenAI: gpt-oss-120b (free)** | Openai | 131K | 💬 text | varies | [link](https://openrouter.ai/openai/gpt-oss-120b:free) |
| 18 | **OpenAI: gpt-oss-20b (free)** | Openai | 131K | 💬 text | varies | [link](https://openrouter.ai/openai/gpt-oss-20b:free) |
| 19 | **Z.ai: GLM 4.5 Air (free)** | Z ai | 131K | 💬 text | varies | [link](https://openrouter.ai/z-ai/glm-4.5-air:free) |
| 20 | **Meta: Llama 3.3 70B Instruct (free)** | Meta llama | 131K | 💬 text | 30 req/min | [link](https://openrouter.ai/meta-llama/llama-3.3-70b-instruct:free) |
| 21 | **Meta: Llama 3.2 3B Instruct (free)** | Meta llama | 131K | 💬 text | 30 req/min | [link](https://openrouter.ai/meta-llama/llama-3.2-3b-instruct:free) |
| 22 | **Nous: Hermes 3 405B Instruct (free)** | Nousresearch | 131K | 💬 text | 20 req/min | [link](https://openrouter.ai/nousresearch/hermes-3-llama-3.1-405b:free) |
| 23 | **NVIDIA: Nemotron 3.5 Content Safety (free)** | Nvidia | 128K | 💬 text, 🖼️ vision | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-3.5-content-safety:free) |
| 24 | **NVIDIA: Nemotron Nano 12B 2 VL (free)** | Nvidia | 128K | 🖼️ vision, 💬 text, video | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-nano-12b-v2-vl:free) |
| 25 | **NVIDIA: Nemotron Nano 9B V2 (free)** | Nvidia | 128K | 💬 text | 40 req/min | [link](https://openrouter.ai/nvidia/nemotron-nano-9b-v2:free) |
| 26 | **Mistral Nemo** | Pollinations AI | 128K | 💬 text | unlimited (no auth) | [link](https://pollinations.ai) |
| 27 | **Mistral Small 3.2** | Pollinations AI | 128K | 💬 text | unlimited (no auth) | [link](https://pollinations.ai) |
| 28 | **GPT-4o** | Pollinations AI | 128K | 💬 text, 🖼️ vision | unlimited (no auth) | [link](https://pollinations.ai) |
| 29 | **LiquidAI: LFM2.5-1.2B-Thinking (free)** | Liquid | 33K | 💬 text | 10 req/min | [link](https://openrouter.ai/liquid/lfm-2.5-1.2b-thinking:free) |
| 30 | **LiquidAI: LFM2.5-1.2B-Instruct (free)** | Liquid | 33K | 💬 text | 10 req/min | [link](https://openrouter.ai/liquid/lfm-2.5-1.2b-instruct:free) |
| 31 | **Venice: Uncensored (free)** | Cognitivecomputations | 33K | 💬 text | varies | [link](https://openrouter.ai/cognitivecomputations/dolphin-mistral-24b-venice-edition:free) |
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

## Want always-on access to the best free model?

This tracker powers **[ZeroLimitAI's ZeroOptimize™](https://zerolimitai.com)** — an AI assistant that automatically routes your messages to the highest-ranked free model available at any moment. No setup, no API keys, no switching between tools.

[![Try ZeroLimitAI free](https://img.shields.io/badge/Try%20ZeroLimitAI-Free%203--day%20trial-7c3aed?style=for-the-badge)](https://zerolimitai.com/register)

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
