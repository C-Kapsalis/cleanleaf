// Demo-mode scorer. Used by /api/classify when no CLARIFAI_PAT is configured,
// so a fresh clone runs the full loop with zero API keys. It ignores the photo
// and returns a canned meal; results carry `demo: true` so the UI can say so.
// To swap in a real model, see docs/how-to/swap-the-stub-scorer.md.

const DEMO_MEALS = [
  { name: 'Garden Salad', icon: '🥗', category: 'Vegetable', score: 88, feedback: 'Fresh vegetables with nothing added — squarely NOVA group 1.', fiber: 'Very High', additives: 'None', whole: '95%' },
  { name: 'Fruit Bowl', icon: '🍎', category: 'Fruit', score: 93, feedback: 'Whole fruit, unprocessed. About as clean as a meal gets.', fiber: 'High', additives: 'None', whole: '100%' },
  { name: 'Grain Bowl', icon: '🥙', category: 'Meal', score: 76, feedback: 'Whole grains, vegetables, and legumes — minimally processed and balanced.', fiber: 'Medium', additives: 'Low', whole: '70%' },
  { name: 'Lentil Curry', icon: '🍛', category: 'Meal', score: 82, feedback: 'Legumes and spices, home-cooking territory. Very little processing.', fiber: 'Very High', additives: 'None', whole: '90%' },
  { name: 'Veggie Stir Fry', icon: '🥘', category: 'Meal', score: 75, feedback: 'Vegetable-heavy with some cooking oil — a solid minimally-processed plate.', fiber: 'Medium', additives: 'Low', whole: '70%' },
  { name: 'Turkey Sandwich', icon: '🥪', category: 'Meal', score: 58, feedback: 'Commercial bread and deli meat put this in NOVA group 3 — processed.', fiber: 'Medium', additives: 'Medium', whole: '45%' },
  { name: 'Cheese Pizza', icon: '🍕', category: 'Fast Food', score: 42, feedback: 'Refined flour and processed cheese dominate. Adding vegetables would lift it.', fiber: 'Low', additives: 'High', whole: '25%' },
  { name: 'Chocolate Donut', icon: '🍩', category: 'Dessert', score: 15, feedback: 'Deep-fried dough with a sugar glaze — a classic NOVA group 4 ultra-processed food.', fiber: 'None', additives: 'Very High', whole: '5%' },
];

export function scoreDemoMeal() {
  const meal = DEMO_MEALS[Math.floor(Math.random() * DEMO_MEALS.length)];
  return { ...meal, food: true, demo: true };
}
