# Release notes

Notes describe what you will see and can do, not internal code changes. For
the full design story, see the [README](README.md) and [docs](docs/README.md).

## v0.1.0 — 2026-07-18

First open-source release: the prototype pitched at Syracuse University's
Whitman School (Dean's Sustainability Challenge, 2nd Place Judge's Favorite),
cleaned up and documented.

### Highlights

- **Complete demo loop with zero configuration.** Clone, `npm install`,
  `npm run dev` — no API keys, no database. You get a simulated WhatsApp
  group chat for a "Go Vegetarian" challenge: check-in nudges, a
  browser-camera scan flow, an animated Clean Score card, points, streaks,
  and a live-updating group leaderboard.
- **Optional live meal scoring.** Set one environment variable
  (`CLARIFAI_PAT`) and the scan sends your photo to a vision model that
  scores it against the NOVA food-classification system. Without the
  variable, a stub scorer answers and the score card says "Demo mode".
- **Institution dashboard.** `/admin` shows the buyer's side of the same
  loop — participants, challenges, targeted messaging, leaderboards, and SDG
  reports — rendered from clearly fictional seed data.
- **Documentation set.** A tutorial, how-to guides, reference pages, and two
  design explanations, organized with the Diátaxis framework under `docs/`.

### What works today, what is concept

This release is honest about its edges (the README keeps the authoritative
list):

- Working: the chat demo at `/`, the `POST /api/classify` scoring endpoint
  (stub and live modes), and the `/admin` dashboard.
- Concept only: real chat-platform delivery (WhatsApp/Teams/Slack APIs),
  persistence and aggregation, accounts, CRM sync, and actual message
  sending from the admin side — the "send" is simulated locally.

### Known limitations

- Chat state lives in memory; refreshing the page resets your points and
  streak.
- Admin numbers are seed data, not rollups of your scans.
- The camera requires a secure origin: `localhost` in development, HTTPS
  when deployed.
- Live scoring depends on a third-party API (Clarifai) and bills per
  request.

### Install

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` (chat demo) and
`http://localhost:3000/admin` (dashboard). To enable live scoring, see
[Swap the stub scorer for a real model](docs/how-to/swap-the-stub-scorer.md).
