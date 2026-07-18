# CleanLeaf

**Healthy habits, built into the group chats people already use.**

CleanLeaf is a working concept demo from a 2026 sustainability-challenge
pitch, presented at Syracuse University's Whitman School (the Dean's
Sustainability Challenge), where it took **2nd Place Judge's Favorite**.
This repository is that prototype, cleaned up and maintained as open
source.

The pitch is a B2B2C wellness platform with one design idea at its core:
**don't build a destination app.** Wellness apps die because they ask people
to go somewhere new; CleanLeaf instead lives inside the WhatsApp, Teams, or
Slack groups an institution already runs, and makes a single action —
photograph your meal — pay three parties at once. The person gets an instant
Clean Score and a streak (the habit), their group gets points on a shared
leaderboard (the accountability), and the institution gets aggregate data for
its ESG/SDG reporting (the reason it pays). One photo, three payoffs — that's
the whole product, and this repo is the interactive version of that argument.

## What works today and what's concept

Working, in this repo:

- **`/`** — a simulated WhatsApp group chat for a "Go Vegetarian" challenge:
  check-in nudges, a browser-camera scan flow, an animated Clean Score card,
  points, streaks, and a live-updating group leaderboard.
- **`POST /api/classify`** — the meal-scoring endpoint. With no keys it
  answers from a stub scorer, so the full loop runs on a fresh clone; with a
  `CLARIFAI_PAT` set it scores your actual photo with a vision model against
  the [NOVA food-classification system](https://en.wikipedia.org/wiki/Nova_classification).
- **`/admin`** — the institution-side dashboard: participants, challenges,
  targeted messaging, leaderboards, and SDG reports, all rendering clearly
  fictional seeded data (every name and number is invented).

Concept only — described in the docs, not shipped:

- Real chat-platform delivery (WhatsApp/Teams/Slack messaging APIs). The
  chat here is a faithful simulation; that integration is the roadmap idea
  the demo argues for.
- Persistence and aggregation. There is no database; chat state lives in
  memory and the admin numbers are seed data, not rollups of your scans.
- Accounts, CRM sync, and the "send message" action on the admin side — the
  send is simulated locally.

## Quickstart

No API keys, no configuration:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), tap the scan link in the
chat, allow camera access, and photograph anything.* The bot replies with a
Clean Score card and your points move the leaderboard. The institution's side
of the same loop is at [http://localhost:3000/admin](http://localhost:3000/admin).

\* In demo mode the photo isn't analyzed — the stub scorer
(`src/lib/demo-scorer.js`) returns a canned meal, and the score card says so
in a "Demo mode" footnote.

### Turn on live scoring

```bash
cp .env.example .env.local   # then set CLARIFAI_PAT=<your Clarifai token>
npm run dev
```

That's the whole switch — with the token present, `/api/classify` sends your
photo to a vision model (Claude via Clarifai's OpenAI-compatible endpoint)
with a NOVA-grounded scoring prompt. Details and alternatives (including
wiring in your own model) in
[Swap the stub scorer](docs/how-to/swap-the-stub-scorer.md).

## The three-party design

The reason a meal photo is the unit of everything:

| Party | Gives | Gets |
|---|---|---|
| Individual | One photo of a meal | Instant Clean Score, streak, points — feedback inside a chat they already had open |
| Community (dorm, department, chapter) | Nothing extra — points are a side effect | A leaderboard and shared momentum; gentle peer accountability |
| Institution | The challenge program (and the bill) | Aggregate participation and consumption data mapped to SDG 3 & 12 for ESG reporting |

No party performs work whose payoff belongs to someone else — which is where
most wellness programs break. The full argument is in
[The three-party design](docs/explanation/three-party-design.md), and its
companion, [Integration over destination](docs/explanation/integration-over-destination.md),
explains why all of it happens in a group chat instead of an app.

## Documentation

The docs follow the [Diátaxis](https://diataxis.fr) framework, under
[`docs/`](docs/README.md):

- **Tutorial** — [Run the demo loop end to end](docs/tutorials/first-demo-loop.md)
- **How-to** — [Deploy to Vercel](docs/how-to/deploy-to-vercel.md) ·
  [Swap the stub scorer for a real model](docs/how-to/swap-the-stub-scorer.md) ·
  [Configure an institution and challenge](docs/how-to/configure-a-challenge.md)
- **Reference** — [Routes](docs/reference/routes.md) ·
  [Components](docs/reference/components.md) ·
  [Data shapes](docs/reference/data-shapes.md) ·
  [Environment variables](docs/reference/environment-variables.md)
- **Explanation** — [The three-party design](docs/explanation/three-party-design.md) ·
  [Integration over destination](docs/explanation/integration-over-destination.md)

What changed in each version, and what works today compared to what remains
concept, is tracked in the [release notes](RELEASE-NOTES.md).

## Contributing

Contributions are welcome as long as they keep the demo small, runnable, and
honest — in particular, **zero-key demo mode must keep working** on a fresh
clone. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Team

The original pitch was built by Clarissa Karki, Ecem Ipek, Tanvi Mahadik, and
Chris Kapsalis at Syracuse University's Whitman School of Management.
SDG alignment: SDG 3 (Good Health & Well-Being) and SDG 12 (Responsible
Consumption & Production).

## License

[MIT](LICENSE) © 2026 Christoforos Kapsalis
