# Environment variables

CleanLeaf runs with **no environment variables** — that is demo mode, the
default. `.env.example` at the repository root documents everything below;
copy it to `.env.local` for local overrides.

| Variable | Required | Default behavior when unset | Effect when set |
|---|---|---|---|
| `CLARIFAI_PAT` | No | `POST /api/classify` answers from the stub scorer in `src/lib/demo-scorer.js`: a canned meal with `demo: true`, no network calls. | The route scores the submitted photo live with a vision model (Claude through Clarifai's OpenAI-compatible endpoint), using a NOVA-grounded prompt. |

`CLARIFAI_PAT` is a Clarifai Personal Access Token, read server-side only (it
is never exposed to the browser). It is checked per request, so changing it
requires only a server restart, not a rebuild.

For deployment, set it in your host's environment settings — see
[Deploy to Vercel](../how-to/deploy-to-vercel.md). For replacing the live
path with a different model or provider entirely, see
[Swap the stub scorer](../how-to/swap-the-stub-scorer.md).
