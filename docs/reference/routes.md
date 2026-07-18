# Routes

CleanLeaf is a Next.js 14 App Router project. All routes live under
`src/app/`.

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.js` | The user-side demo: a simulated WhatsApp group chat for the active challenge, with the camera scan flow, score cards, and the group leaderboard. Client component; holds all chat state in memory. |
| `/admin` | `src/app/admin/page.js` | The institution-side dashboard: Overview, Contacts, Challenges, Messaging, Leaderboard, and SDG Reports tabs. Client component rendering fictional seed data; the message "send" is simulated locally. |

Navigation between the two is a single link: the back arrow in the admin top
bar returns to `/`. The chat page does not link to `/admin`.

## API

### `POST /api/classify`

File: `src/app/api/classify/route.js`

Scores a meal photo.

**Request body**

```json
{ "base64": "<base64-encoded JPEG, no data: prefix>" }
```

**Response** — `200` with a scoring result:

```json
{ "result": { "food": true, "name": "Garden Salad", "score": 88, "...": "..." } }
```

See [Data shapes](data-shapes.md#scoreresult) for the full `result` object.
`result.food` is `false` when the model saw no food. `result.demo` is `true`
when the stub scorer answered.

**Mode selection** — decided per request by the presence of `CLARIFAI_PAT`:

| `CLARIFAI_PAT` | Behavior |
|---|---|
| unset | Demo mode. The stub scorer (`src/lib/demo-scorer.js`) returns a canned meal; the request body is ignored; no network calls. |
| set | Live mode. The photo is sent to Claude via Clarifai's OpenAI-compatible endpoint with a NOVA-grounded scoring prompt. |

**Errors** (live mode only) — `400` `{ "error": …, "details": … }` when the
model reply contains no parseable JSON; `500` `{ "error": … }` on upstream or
parsing failures. In both cases `error` is a sentence describing what failed.
The chat page reports any error as a scoring-service failure — it explains
that the photo could not be scored and posts a fresh scan link — and awards
no points. A `food: false` result gets a separate no-food-detected reply.
