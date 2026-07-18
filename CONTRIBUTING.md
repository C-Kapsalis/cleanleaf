# Contributing to CleanLeaf

Thanks for your interest. CleanLeaf is a prototype maintained as a working
concept demo, so contributions should keep it small, runnable, and honest
about what it is.

## Ground rules

- **Keep zero-key demo mode working.** `npm install && npm run dev` on a fresh
  clone must produce a working demo with no API keys and no backend. Anything
  that needs credentials has to degrade to the stub scorer.
- **No real user data.** All seed data lives in `src/lib/demo-data.js` and is
  fictional. Keep it that way.
- **Match the existing style.** Plain JavaScript, React function components,
  Tailwind for styling. No TypeScript migrations, no new state libraries, no
  component frameworks — the whole app should stay readable in one sitting.

## Workflow

1. Fork and create a topic branch.
2. Make your change. Run `npm run build` — it must pass.
3. Walk the demo loop once (see `docs/tutorials/first-demo-loop.md`) to check
   nothing in the chat flow broke.
4. If your change is visible to users, add a one-line entry to
   [RELEASE-NOTES.md](RELEASE-NOTES.md) describing what they will notice.
5. Open a pull request describing what changed and why. Screenshots help for
   anything visual.

## Where things live

| Area | Path |
|---|---|
| Chat demo (user side) | `src/app/page.js` + `src/components/` |
| Admin dashboard (institution side) | `src/app/admin/page.js` |
| Meal scoring endpoint | `src/app/api/classify/route.js` |
| Stub scorer (demo mode) | `src/lib/demo-scorer.js` |
| Points and score bands | `src/lib/scoring.js` |
| Seed/demo data | `src/lib/demo-data.js` |
| Documentation | `docs/` (Diátaxis: tutorials / how-to / reference / explanation) |

If you change behavior, update the matching page under `docs/`.
