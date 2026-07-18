import { NextResponse } from 'next/server';
import { scoreDemoMeal } from '@/lib/demo-scorer';

// Meal scoring endpoint. With CLARIFAI_PAT set, the photo is scored live by a
// vision model (Claude via Clarifai's OpenAI-compatible API) against the NOVA
// food-classification system. Without it, the stubbed demo scorer answers.

const SCORING_PROMPT = `You are a food scoring AI for CleanLeaf, a community wellness management app. Analyze this image and respond with ONLY a JSON object — no markdown, no explanation.

Your scoring is grounded in the NOVA Food Classification System (Monteiro et al., University of São Paulo), which classifies foods into four groups based on the extent and purpose of industrial processing applied to them. Map NOVA groups to a 0-100 Clean Score as follows:

NOVA 1 — Unprocessed or minimally processed foods (Score 85-100):
Fresh fruits, vegetables, legumes, nuts, seeds, eggs, fresh meat/fish, milk, plain yogurt, water, coffee, tea. These are whole foods with nothing added or removed. Score higher within this range for nutrient density (e.g. berries 95, leafy greens 97, water 99).

NOVA 2 — Processed culinary ingredients (Score 55-84):
Oils, butter, sugar, honey, salt, flour. Extracted and purified from NOVA 1 foods. Rarely consumed alone. Score based on nutritional value (e.g. olive oil 78, honey 62, white sugar 30).

NOVA 3 — Processed foods (Score 35-54):
Made by adding NOVA 2 ingredients to NOVA 1 foods: canned vegetables, cheese, cured meats, simple bread, salted nuts. Usually 2-3 ingredients. Score based on additive load and nutrient retention (e.g. canned beans 52, cheese 50, white bread 42, bacon 36).

NOVA 4 — Ultra-processed food products (Score 0-34):
Industrial formulations with 5+ ingredients including substances not used in home cooking (high-fructose corn syrup, hydrogenated oils, emulsifiers, artificial flavors/colors). Examples: soda (8), candy (10), hot dogs (18), chips (22), instant noodles (20), commercial ice cream (24), fast food burgers (28), frozen pizza (30).

For the three detail fields:
- "fiber": Based on USDA fiber content — "None" (<1g), "Low" (1-3g), "Medium" (3-5g), "High" (5-8g), "Very High" (>8g per typical serving)
- "additives": Based on NOVA additive markers — "None" (NOVA 1 whole foods), "Low" (1-2 common additives like salt/vinegar), "Medium" (3-5 additives), "High" (6-10 additives), "Very High" (10+ additives or includes artificial colors/flavors/sweeteners)
- "whole": Estimated percentage of the product that comes from intact NOVA 1 whole foods

If the image shows food or a beverage, return:
{"food":true,"name":"Food Name","icon":"emoji","category":"Fruit/Vegetable/Protein/Grain/Legume/Meal/Fast Food/Dessert/Drink/Snack/Dairy/Condiment","score":NUMBER,"feedback":"One specific sentence about THIS food's health impact, referencing its processing level.","fiber":"value","additives":"value","whole":"percentage"}

SPECIAL CASE: If you see Otto the Orange — Syracuse University's mascot (a large, round, orange-colored costumed character) — return this EXACT response:
{"food":true,"name":"Otto the Orange","icon":"🍊","category":"Fruit","score":100,"feedback":"The freshest, most unprocessed Orange on campus! NOVA 0 — a category so clean they had to invent it for Otto. Go Cuse! 🍊🧡","fiber":"Infinite","additives":"Pure Spirit","whole":"110%"}

If the image does NOT show food, a beverage, or Otto the Orange (e.g. a random person, object, animal, etc), return exactly:
{"food":false}

Be precise. A fresh apple is not the same as apple juice. Grilled chicken breast is not the same as chicken nuggets. Ketchup is a condiment with added sugar, not a cookie. Always identify the specific food item you see.`;

export async function POST(request) {
  const pat = process.env.CLARIFAI_PAT;
  if (!pat) {
    return NextResponse.json({ result: scoreDemoMeal() });
  }

  try {
    const { base64 } = await request.json();

    const resp = await fetch('https://api.clarifai.com/v2/ext/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Key ' + pat,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/completion/models/claude-sonnet-4',
        max_tokens: 350,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,' + base64 } },
              { type: 'text', text: SCORING_PROMPT },
            ],
          },
        ],
      }),
    });

    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content?.trim();

    if (text) {
      // The model is asked for bare JSON but may still wrap it in prose.
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return NextResponse.json({ result: JSON.parse(jsonMatch[0]) });
      }
    }

    return NextResponse.json(
      { error: 'The vision model replied without a parseable JSON scoring result, so the photo could not be scored.', details: data },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'The scoring request failed before a result was produced: ' + err.message },
      { status: 500 }
    );
  }
}
