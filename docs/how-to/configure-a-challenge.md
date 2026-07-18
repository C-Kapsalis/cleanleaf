# Configure an institution and challenge

All the demo's institutional context — who is running the challenge, what the
challenge is, which groups compete — is seed data in `src/lib/demo-data.js`.
This guide shows what to edit to stage the demo for a different institution or
program. No code changes are needed outside that file, except the two branding
strings noted at the end.

## Change the challenge

Edit the `CHALLENGE` object:

```js
export const CHALLENGE = {
  name: 'Go Vegetarian',   // shown in the chat, camera overlay, leaderboard
  emoji: '🌿',
  durationDays: 30,
  day: 8,                  // "Day 8 Check-in" framing throughout
  participants: 438,
  startedLabel: 'Mar 17',
  slug: 'go-vegetarian',   // the fake scan URL: cleanleaf.app/scan/<slug>
};
```

Every surface that mentions the challenge reads from here, so renaming it to
"Hydration 2L/day" updates the chat opener, the camera banner, and the
leaderboard title together.

## Change the competing groups

Edit `GROUPS` — rank-ordered, highest points first. Each entry drives both the
chat leaderboard and the admin dashboard:

```js
{ rank: 1, name: 'Sigma Nu', abbr: 'ΣN', pts: 2840, streak: 16, today: '+142', color: 'bg-purple-500' },
```

The chat uses the top four (`CHAT_GROUPS`) and inserts the current user as a
fifth row; the admin leaderboard shows all five. Keep `pts` descending so the
precomputed `rank` stays truthful, and keep `color` a Tailwind background
class.

## Change the admin dashboard data

The remaining exports feed the `/admin` tabs:

- `ADMIN_CHALLENGES` — the challenge portfolio with enrollment and completion.
- `ADMIN_MESSAGES` — the messaging history with open/tap rates.
- `ADMIN_CONTACTS` — the imported-contacts table.
- `SDG_COHORTS` — the cohort breakdown on the SDG Reports tab.

Use fictional people only. The demo ships with invented names and numbers,
and contributions must keep it that way.

## Change the institution branding

Two strings are hard-coded where they appear, since they are presentation
copy rather than data:

- the chat header title in `src/app/page.js` (`CleanLeaf · Whitman SU`) and
  the member line under it;
- the admin top bar in `src/app/admin/page.js` (`Syracuse University`,
  `Live · Spring 2026`).

The opening bot message in `src/app/page.js` also says "across Syracuse" —
adjust it to match your institution.
