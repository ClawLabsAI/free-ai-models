# Contributing to free-ai-models

Thanks for helping keep this list accurate and complete!

## Adding a missing free model

1. Fork this repo
2. Edit `scripts/fetch-models.js` — find the `EXTRA_PROVIDERS` array
3. Add your model following this shape:

```js
{
  id:             "provider/model-name",   // unique slug
  name:           "Human Readable Name",
  provider:       "Provider Name",
  context_window: 128_000,                 // in tokens
  modalities:     ["text"],                // "text" | "image" | "file"
  rate_limit:     "20 req/min",            // or "unlimited" / "varies"
  notes:          "Optional: any caveats", // e.g. "No auth required"
  source:         "https://provider.com/docs",
},
```

4. Open a PR with title: `feat: add [Model Name] ([Provider])`

## Rules

- ✅ Model must be **genuinely free** (no credit card, no trial, no waitlist)
- ✅ Must have a **public API endpoint** (not web-only)
- ✅ Include a **source URL** (docs or API reference)
- ❌ No models that require waiting lists or invite codes
- ❌ No models that are free only for the first N requests then paid

## Reporting a broken / removed model

Open an issue with the model ID and what you observed (rate limit change, 404, pricing change). We'll remove or flag it in the next update.

## Questions

Open an issue — we respond quickly.
