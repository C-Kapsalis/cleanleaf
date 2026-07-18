# Run the demo loop end to end

In this tutorial you will run CleanLeaf locally and complete one full loop of
the experience it demonstrates: receive a challenge nudge in a group chat, log
a meal with your camera, get a Clean Score, and watch your points move the
group leaderboard.

You need Node.js 18 or newer and a device with a camera — a laptop webcam is
fine. No API keys are required: the app starts in demo mode, where a stub
scorer answers instead of a real vision model.

## 1. Install and start

```bash
git clone <your-fork-or-copy-of-this-repo> cleanleaf
cd cleanleaf
npm install
npm run dev
```

When the dev server is ready, open [http://localhost:3000](http://localhost:3000).

You are looking at a simulated WhatsApp group chat for a university community.
The CleanLeaf bot has already posted the day's check-in: a welcome to the
"Go Vegetarian" challenge, a Week 1 recap with group standings, and a scan
link.

## 2. Log a meal

1. Tap the **cleanleaf.app/scan/go-vegetarian** link card at the bottom of the
   chat.
2. Your browser asks for camera permission — allow it. A camera overlay opens
   with a scanning frame.
3. Point the camera at anything (in demo mode the photo isn't actually
   analyzed) and press the green shutter button.

Your photo lands in the chat as an outgoing message, and the bot starts
typing.

## 3. Read your Clean Score

After a moment the bot replies with a score card:

- a **0–100 Clean Score** on an animated ring — higher means less processed,
  following the NOVA food-classification system;
- the meal's name, category, and a one-line verdict;
- three detail stats: fiber, additives, and whole-food content;
- the **points earned** for your group.

In demo mode the card carries a small "Demo mode" note, because the score is a
canned result from `src/lib/demo-scorer.js`, not an analysis of your photo.

## 4. Watch the leaderboard move

Right under the score card, the bot posts the group leaderboard. You entered
the challenge with 0 points; the meal you just logged earned your first
points, and "You" now appears ranked against the four demo groups. Your streak
ticked up from 7 to 8 days.

## 5. Go around again

The bot ends with a fresh scan link. Log a second meal and note what changes:
your points accumulate, your streak ticks up again, and your leaderboard row
climbs as you overtake group point totals.

That is the whole habit loop CleanLeaf demonstrates — nudge, photo, score,
standing — living inside a chat rather than an app.

## Where to go next

- See the institution's side of the same loop at
  [http://localhost:3000/admin](http://localhost:3000/admin) — challenges,
  messaging, and the SDG report that every logged meal feeds.
- Score meals for real: [Swap the stub scorer for a real model](../how-to/swap-the-stub-scorer.md).
- Stage your own challenge: [Configure an institution and challenge](../how-to/configure-a-challenge.md).
- Understand why the loop is built this way:
  [The three-party design](../explanation/three-party-design.md).
