// Seed data for the demo. Every name, number, and stat in this file is
// fictional. Edit this file to stage a different challenge — see
// docs/how-to/configure-a-challenge.md.

export const CHALLENGE = {
  name: 'Go Vegetarian',
  emoji: '🌿',
  durationDays: 30,
  day: 8,
  participants: 438,
  startedLabel: 'Mar 17',
  slug: 'go-vegetarian',
};

// Group standings shown on both the chat leaderboard and the admin dashboard.
export const GROUPS = [
  { rank: 1, name: 'Sigma Nu', abbr: 'ΣN', pts: 2840, streak: 16, today: '+142', color: 'bg-purple-500' },
  { rank: 2, name: 'Alpha Phi', abbr: 'AΦ', pts: 2615, streak: 11, today: '+98', color: 'bg-pink-500' },
  { rank: 3, name: 'Kappa Delta', abbr: 'KΔ', pts: 2490, streak: 9, today: '+77', color: 'bg-blue-500' },
  { rank: 4, name: 'Theta Chi', abbr: 'ΘΧ', pts: 2210, streak: 8, today: '+54', color: 'bg-orange-500' },
  { rank: 5, name: 'Beta Theta Pi', abbr: 'BΘ', pts: 1980, streak: 4, today: '+31', color: 'bg-cyan-500' },
];

// The chat leaderboard shows the top four groups plus the current user.
export const CHAT_GROUPS = GROUPS.slice(0, 4);

export const ADMIN_CHALLENGES = [
  { name: 'Go Vegetarian — 30 days', enrolled: 438, day: '8 of 30', completion: 74, color: 'bg-green-500' },
  { name: 'Hydration 2L/day', enrolled: 312, day: '8 of 14', completion: 81, color: 'bg-blue-500' },
  { name: 'High Fibre Week', enrolled: 289, day: '6 of 7', completion: 65, color: 'bg-amber-500' },
  { name: 'No Ultra-Processed', enrolled: 201, day: '8 of 21', completion: 52, color: 'bg-red-400' },
];

export const ADMIN_MESSAGES = [
  { name: 'Day 8 nudge — Go Vegetarian', time: 'Mon 9:02am · 438 recipients', channel: 'WhatsApp', open: 91, tap: 67 },
  { name: 'Hydration check-in', time: 'Mon 1:00pm · 312 recipients', channel: 'WhatsApp', open: 87, tap: 72 },
  { name: 'Weekly recap + leaderboard', time: 'Sun 6:00pm · 1,284 recipients', channel: 'Teams', open: 76, tap: 45 },
  { name: 'Re-engage lapsed users', time: 'Fri 10:00am · 198 recipients', channel: 'WhatsApp', open: 54, tap: 31 },
];

export const ADMIN_CONTACTS = [
  { name: 'Riya S.', cohort: 'Engineering', challenge: 'Hydration', status: 'Active', streak: 14 },
  { name: 'Amir K.', cohort: 'Business', challenge: 'Protein Focus', status: 'Active', streak: 11 },
  { name: 'Sofia M.', cohort: 'Law', challenge: 'Vegetarian', status: 'Active', streak: 9 },
  { name: 'James O.', cohort: 'Arts & Sciences', challenge: '—', status: 'Lapsed', streak: 0 },
  { name: 'Wei C.', cohort: 'Public Health', challenge: 'Vegetarian', status: 'Active', streak: 8 },
];

export const SDG_COHORTS = [
  { name: 'Engineering', pct: 82 },
  { name: 'Business', pct: 74 },
  { name: 'Arts & Sciences', pct: 61 },
  { name: 'Law', pct: 49 },
];
