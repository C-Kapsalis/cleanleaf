# Integration over destination

CleanLeaf has no app. That absence is the architecture, and this page explains
the principle behind it — *integration over destination* — which comes from
[Christoforos Kapsalis's](https://github.com/c-kapsalis) design philosophy of
the same name, written up after the pitch. The argument below adapts that
essay to the codebase.

## Why wellness programs fail

Wellness programs treat wellness as a personal problem you can solve with a
single tool: download this app, track what you eat, stay motivated on your
own. The dropout curve is brutal — consistent in week one, wobbling by
midterms, forgotten by week three — and the people who stick around are
mostly the ones who already had the habit. When that happens the blame tends
to land on the user. But the user didn't fail; the design did. The app was built as a
**destination**: a new place users must remember to go, competing for
attention against every place they already are.

The same pattern repeats across the industry. Instead of asking where
people's attention already lives and putting the solution there, product
teams build new platforms and expect people to come to them. Instead of
designing for how people actually behave, they design for how they wish
people would. The result is always the same: abandoned tools and wasted
spend.

## The principle

Stop designing for how you wish people behaved; design for how they actually
do. The best solutions find where attention already lives, where the workflow
already runs, where the decision is already being made — and remove whatever
friction stands between that moment and the better outcome. The best tool is
not the most powerful one; it is the one people actually use.

## What that means in the architecture

Applied to wellness, the principle dictated every structural choice in
CleanLeaf:

- **Group-chat-first, no destination app.** The average person already uses
  three or more messaging platforms daily, so challenges arrive as messages
  in WhatsApp, Teams, or Slack group chats the institution already runs. In
  the intended production architecture the delivery layer is messaging APIs
  (ManyChat/Twilio-class), not an app store listing. The prototype renders
  this honestly: the demo *is* a chat screen, because that is the product's
  entire user surface.
- **The only "app moment" is a URL.** When a user taps the scan link, they
  get a camera page in the browser — no install, no account, no login wall.
  In this codebase that is the whole of `/` plus one API route.
- **Community built-in, not bolted on.** Habit formation is strongest in
  communal environments, and group chats are already communities with names,
  members, and social gravity. CleanLeaf borrows that existing accountability
  (leaderboards and streaks posted into the chat) rather than asking users to
  form a new social graph inside yet another app.
- **The institution integrates, too.** The admin side plugs into contact
  lists and CRMs the institution already maintains, and reports into the
  ESG/SDG frameworks it already answers to. Nobody — user or admin — is asked
  to adopt a new home.

## The trade

Destinations are what product teams default to because they are easier to
own: full control of the surface, the data, the branding. Integration means
living on someone else's platform, inside someone else's conventions — the
demo goes as far as faithfully reproducing WhatsApp's visual language rather
than inventing its own, because the product's promise is precisely that it
looks like something you already use. That trade — control surrendered for
adoption gained — is the bet the whole concept makes.
