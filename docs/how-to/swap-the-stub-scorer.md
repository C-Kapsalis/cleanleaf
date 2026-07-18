# Swap the stub scorer for a real model

Out of the box, `POST /api/classify` answers from the stub scorer in
`src/lib/demo-scorer.js` — a canned result, no network calls. This guide
covers the two ways to score meals for real: turning on the built-in vision
model, or wiring in your own.

## Option A — turn on the built-in vision path

The route already contains a live scoring path that sends the photo to Claude
through Clarifai's OpenAI-compatible endpoint, with a prompt grounded in the
NOVA food-classification system.

1. Create a [Clarifai](https://clarifai.com) account and generate a Personal
   Access Token.
2. Copy `.env.example` to `.env.local` and set it:

   ```bash
   CLARIFAI_PAT=your-token-here
   ```

3. Restart `npm run dev`.

That's the whole switch: the route checks `process.env.CLARIFAI_PAT` and uses
the live path whenever it is set. Photos without food in them now get the
no-food-detected reply in the chat, which the stub never produces.

## Option B — wire in your own model or API

Replace the live path inside `src/app/api/classify/route.js`. The request
body is `{ base64 }` — a base64-encoded JPEG without the `data:` prefix. Your
implementation must respond with:

```json
{ "result": { ...ScoreResult } }
```

where `ScoreResult` is the shape documented in
[Data shapes](../reference/data-shapes.md). The two contract points the chat
UI depends on:

- **Food detected** — return `food: true` plus a `score` (0–100), `name`,
  `icon`, `category`, `feedback`, and the `fiber`/`additives`/`whole` details.
  Points are derived from `score` by `getPointsEarned` in
  `src/lib/scoring.js`.
- **No food detected** — return `{ "result": { "food": false } }`. The chat
  shows a retry message and awards no points.

Any backend that honors this contract works: an OpenAI-compatible vision
endpoint, a self-hosted classifier (the original pitch architecture named
EfficientNet/YOLOv8 with USDA FoodData Central and Open Food Facts as ground
truth), or a lookup service keyed on barcode scans. Keep the scoring anchored
to a published system such as NOVA so scores stay explainable.

## Keep demo mode intact

Leave the `if (!pat) return … scoreDemoMeal()` branch (or an equivalent
no-credentials fallback) in place. The project's contract is that a fresh
clone with no keys still completes the full demo loop — see
[CONTRIBUTING.md](../../CONTRIBUTING.md).
