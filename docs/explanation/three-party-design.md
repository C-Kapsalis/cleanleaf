# The three-party design

CleanLeaf's central design decision is that **one action pays three parties**.
A participant photographs a meal — that is the entire ask — and the same
photo, in the same moment, does three different jobs:

1. **For the individual**, it is a habit rep. The photo comes back as a Clean
   Score with immediate, concrete feedback ("whole ingredients, low
   additives") and a nudge toward the next log. Logging takes seconds and
   happens inside a chat the person had open anyway.
2. **For the community**, it is a contribution. The meal earns points for the
   person's group — dorm, department, chapter — and moves a leaderboard that
   everyone in the group chat can see. Streaks and standings turn a private
   choice into shared momentum and gentle peer accountability.
3. **For the institution**, it is a data point. Aggregated across thousands of
   logged meals, the same activity becomes the evidence base for the
   institution's ESG/SDG reporting — participation, completion, and
   consumption trends mapped to SDG 3 (Good Health & Well-Being) and SDG 12
   (Responsible Consumption & Production) — compiled automatically instead of
   assembled by hand for an annual report.

## Why this alignment matters

Wellness programs usually fail on incentives, not features. The person is
asked to do work (tracking) whose payoff is distant and private; the community
is not involved at all; and the institution funding the program cannot see
whether it worked. Each party's benefit depends on effort from a party who
doesn't share it — so the program decays.

The three-party design collapses that: nobody performs extra work for someone
else's benefit. The individual acts for the score and the streak; the
community benefit is a side effect of the points system; the institutional
benefit is a side effect of aggregation. This is also what makes the B2B2C
business model coherent — the institution pays because it genuinely receives
something (measurable outcomes tied to its sustainability commitments), not
as a benevolent sponsor of an app its people will abandon.

It builds on a structure that already exists: people are naturally organized
into communities as students of a university or employees of a corporation,
and research on habit formation consistently finds that communal environments
are where habits actually stick.

## How the demo embodies it

The prototype shows all three payoffs of a single scan:

- the **score card** (individual feedback) and the **streak** message that
  follows it — `src/app/page.js`;
- the **leaderboard card** posted right after, where your points move your
  row against the demo groups — `src/components/LeaderboardCard.js`;
- the **SDG Reports tab** in `/admin`, where meals logged roll up into SDG 3
  and SDG 12 indicators and cohort breakdowns — `src/app/admin/page.js`.

In the prototype the admin numbers are fictional seed data rather than a live
aggregation of your scans; the design point is the pipeline's shape, not its
plumbing.

The companion piece, [Integration over destination](integration-over-destination.md),
explains the other half of the design: why all of this happens inside a group
chat rather than an app of its own.
