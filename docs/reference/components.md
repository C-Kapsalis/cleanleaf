# Components

Shared UI lives in `src/components/`. Everything is a plain React function
component styled with Tailwind; the WhatsApp look (bubbles, chips, wallpaper)
comes from custom classes in `src/app/globals.css`.

## `ChatBubbles.js` (named exports)

| Component | Props | Description |
|---|---|---|
| `DateChip` | `text` | Centered date separator chip ("Today"). |
| `EncryptionChip` | — | The WhatsApp end-to-end-encryption notice, for verisimilitude. |
| `BotBubble` | `children`, `time`, `noTail` | Incoming bubble from "CleanLeaf Bot". `noTail` drops the sender label and tail — used when stacking cards under a previous bubble. |
| `UserBubble` | `children`, `time`, `imageUrl` | Outgoing bubble with delivery ticks; renders the captured meal photo when `imageUrl` is set. |
| `TypingIndicator` | — | Three bouncing dots while the scorer "thinks". |

## `ScoreCard.js` (default export)

Props: `food` ([ScoreResult](data-shapes.md#scoreresult)), `points` (number).

The Clean Score result card: animated score ring, meal name/category, verdict
badge and feedback line, the fiber/additives/whole-foods grid, and the points
bar. Shows a "Demo mode" footnote when `food.demo` is true. Score-band colors
and labels come from `getScoreColor` in `src/lib/scoring.js`.

## `LeaderboardCard.js` (default export)

Props: `groups` (array of [Group](data-shapes.md#group)), `userPts`,
`userStreak` (numbers).

Ranks the given groups plus a highlighted "You" row by points, showing streaks
and point totals. Re-sorts on every render, so the user's row climbs as points
accumulate.

## `CameraOverlay.js` (default export)

Props: `onCapture`, `onCancel` (callbacks), `videoRef` (ref attached to the
`<video>` element).

Full-screen camera view with the challenge banner, animated scanning frame,
and shutter button. The parent page owns the `getUserMedia` stream; this
component only renders it.

## Page-local components

`MetricCard` (label/value/sub stat tile) is defined inside
`src/app/admin/page.js` — it is only used there.
