# Data shapes

CleanLeaf has no database; these are the in-memory shapes passed between the
scorer, the seed data, and the UI.

## ScoreResult

Returned by `POST /api/classify` as `result`, and consumed by `ScoreCard`.
Produced either by the stub scorer (`src/lib/demo-scorer.js`) or by the live
vision model, which is prompted to emit exactly this JSON.

| Field | Type | Description |
|---|---|---|
| `food` | boolean | `false` means no food was detected; all other fields are then absent. |
| `name` | string | Display name of the meal ("Garden Salad"). |
| `icon` | string | A single emoji for the meal. |
| `category` | string | One of: Fruit, Vegetable, Protein, Grain, Legume, Meal, Fast Food, Dessert, Drink, Snack, Dairy, Condiment. |
| `score` | number | Clean Score 0–100; higher = less processed, per the NOVA groups. |
| `feedback` | string | One sentence on this food's health impact, referencing its processing level. |
| `fiber` | string | `None` / `Low` / `Medium` / `High` / `Very High`. |
| `additives` | string | `None` / `Low` / `Medium` / `High` / `Very High`. |
| `whole` | string | Estimated whole-food share, as a percentage string ("95%"). |
| `demo` | boolean | Present and `true` only on stub-scorer results; the UI labels the card "Demo mode". |

## Score bands and points

Defined in `src/lib/scoring.js`:

| Score | Label | Points earned |
|---|---|---|
| 90–100 | Excellent | 20 |
| 80–89 | Excellent | 15 |
| 75–79 | Good | 15 |
| 60–74 | Good | 10 |
| 40–59 | Moderate | 5 |
| 20–39 | Low | 2 |
| 0–19 | Ultra-Processed | 2 |

(Labels come from `getScoreColor`, points from `getPointsEarned`; the two
scales intentionally break at different thresholds.)

## Chat message

The chat page (`src/app/page.js`) renders a `messages` array. Each entry has a
`type` plus type-specific fields:

| `type` | Fields | Renders as |
|---|---|---|
| `date` | `text` | `DateChip` |
| `encryption` | — | `EncryptionChip` |
| `bot` | `content` (string or JSX), `time` | `BotBubble` |
| `link` | `time` | The scan-link card; tapping it opens the camera |
| `user-photo` | `imageUrl` (data URL), `time` | `UserBubble` with the photo |
| `score-card` | `food` (ScoreResult), `points`, `time` | `ScoreCard` in a bot bubble |
| `leaderboard` | `userPts`, `userStreak`, `time` | `LeaderboardCard` in a bot bubble |

## Seed data (`src/lib/demo-data.js`)

### Challenge

`CHALLENGE`: `name`, `emoji`, `durationDays`, `day`, `participants`,
`startedLabel`, `slug`. See
[Configure an institution and challenge](../how-to/configure-a-challenge.md).

### Group

Entries of `GROUPS` (all five, admin side) and `CHAT_GROUPS` (top four, chat
side):

| Field | Type | Used by |
|---|---|---|
| `rank` | number | admin leaderboard ordering |
| `name` | string | both |
| `abbr` | string | admin avatar badge |
| `pts` | number | both |
| `streak` | number | both |
| `today` | string | admin ("+142" today) |
| `color` | string | admin; a Tailwind `bg-*` class |

### Admin-only collections

- `ADMIN_CHALLENGES`: `name`, `enrolled`, `day` ("8 of 30"), `completion`
  (percent), `color`.
- `ADMIN_MESSAGES`: `name`, `time`, `channel`, `open`, `tap` (percentages).
- `ADMIN_CONTACTS`: `name`, `cohort`, `challenge`, `status`
  (`Active`/`Lapsed`), `streak`.
- `SDG_COHORTS`: `name`, `pct`.

All values are fictional demo data.
