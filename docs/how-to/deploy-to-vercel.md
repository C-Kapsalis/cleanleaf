# Deploy to Vercel

CleanLeaf is a standard Next.js 14 app with no database, so it deploys to
Vercel's free tier as-is. In demo mode it needs no environment variables at
all.

## Steps

1. Push your copy of the repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
   Vercel detects Next.js automatically — no build settings needed.
3. Click **Deploy**.

## Make the demo publicly reachable

If you are handing the URL to an audience (for example via a QR code),
disable Vercel's login wall first: **Settings → Deployment Protection → turn
off** for the production deployment. Otherwise visitors hit a Vercel
authentication page instead of the chat.

## Enable live scoring (optional)

To score photos with a real vision model instead of the stub scorer:

1. In the Vercel project, open **Settings → Environment Variables**.
2. Add `CLARIFAI_PAT` with your Clarifai Personal Access Token
   (see [Environment variables](../reference/environment-variables.md)).
3. Redeploy.

Without the variable, deployments run in demo mode — which is often what you
want for a public URL, since live scoring bills per request.

## Camera requirements

Browsers only expose `getUserMedia` on secure origins. Vercel serves HTTPS by
default, so the camera works there; locally it works on `localhost`. If you
front the deployment with your own domain, keep it HTTPS.
