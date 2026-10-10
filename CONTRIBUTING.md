# Contributing to free-ai-models

Thanks for helping keep this list accurate. Accuracy is the whole point of it:
a model listed as free that bills, or has quietly stopped answering, is worse
than a model missing from the list.

## How the list is built

Nothing is typed in by hand. Every day a GitHub Action reads each provider's
**own public model list** and keeps the models it reports at $0:

- [OpenRouter](https://openrouter.ai/api/v1/models): models priced `0` for input and output
- [Pollinations](https://text.pollinations.ai/models): models in the anonymous (no key) tier

The ranking is computed in this repo by [`scoring/score.js`](scoring/score.js)
from public data ([how it works](scoring/README.md)). Only the "Today" column
comes from outside: the production health checks of ZeroLimitAI's router, built
by the maintainers (`zerolimitai.com/api/models/free-top`).

## Changing the score

The weights are named constants at the top of `scoring/score.js`. A pull request
that changes one should include the ranking it produces (`npm run update`) and
say why that ranking is better, and must keep `npm test` green — each test there
is a mistake an earlier version of the ranking made.

We used to keep a hand-written list of extra providers. It went stale within
weeks (it still claimed GPT-4o was free, anonymously), so it was removed. A
provider is added only if it can be read the same way: live, from its own API.

## Adding a missing model or provider

- **A model a provider we already read offers for free:** it appears
  automatically within 24 hours. If it does not, open a
  [Report a wrong listing](../../issues/new?template=report-listing.yml) issue.
- **A new provider:** open an
  [Add a free model or provider](../../issues/new?template=request-model.yml)
  issue first, with the link that shows its models are free. If it qualifies,
  a pull request that adds a live fetcher (a function that reads the provider's
  public model list and keeps the free ones) is very welcome.

Pull requests that add models by hand will be closed, however good the model.

## What counts as free

- ✅ Callable at **$0** through a **public API** (not web-only), with a source URL
- ✅ No credit card, no trial period, no waitlist or invite code
- ✅ Rate limits are fine (per minute, per day) as long as they reset and never bill
- ❌ A monthly or weekly **allowance or credit** measured against paid prices,
  "promotional", "limited time" or "rotating" models: they change without notice
  and stop being free when the allowance runs out
- ❌ Free only for the first N requests, then paid
- ❌ Models that only a paid plan unlocks

## Affiliation

If you work for, or are paid by, the provider you are proposing, say so in the
issue. It does not disqualify the provider; not saying so does.

## Reporting a broken or removed model

Use the [Report a wrong listing](../../issues/new?template=report-listing.yml)
form with the model ID and what you saw (charged, 404, rate-limit change).
