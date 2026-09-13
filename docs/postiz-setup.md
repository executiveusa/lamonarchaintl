# Postiz Setup Runbook

This repository is prepared to read Postiz configuration from environment variables. Real API keys and channel IDs must be generated in Postiz and stored only in local or deployment secrets.

## What is already wired

- `paperclip.config.json` references Postiz placeholders for the API key, base URL, and channel IDs.
- `src/services/postizService.ts` reads `VITE_POSTIZ_BASE_URL` and `VITE_POSTIZ_API_KEY` at runtime and falls back to mock queue data when no API key is configured.
- `.env.example` lists every Postiz variable needed by the app without committing any real secret values.

## Required Postiz values

Create or update `.env.local` for local development and add the same values to the deployment environment:

```bash
VITE_POSTIZ_BASE_URL=https://api.postiz.com/public/v1
VITE_POSTIZ_API_KEY=<postiz-api-key>
VITE_POSTIZ_IG_ID=<instagram-channel-id>
VITE_POSTIZ_FB_ID=<facebook-channel-id>
VITE_POSTIZ_X_ID=<x-channel-id>
VITE_POSTIZ_THREADS_ID=<threads-channel-id>
VITE_POSTIZ_BSKY_ID=<bluesky-channel-id>
VITE_POSTIZ_LI_ID=<linkedin-channel-id>
```

For automation tooling that does not use Vite, use the non-`VITE_` names expected by `paperclip.config.json`:

```bash
POSTIZ_BASE_URL=https://api.postiz.com/public/v1
POSTIZ_API_KEY=<postiz-api-key>
POSTIZ_IG_ID=<instagram-channel-id>
POSTIZ_FB_ID=<facebook-channel-id>
POSTIZ_X_ID=<x-channel-id>
POSTIZ_THREADS_ID=<threads-channel-id>
POSTIZ_BSKY_ID=<bluesky-channel-id>
POSTIZ_LI_ID=<linkedin-channel-id>
```

## API details verified against Postiz docs

- Postiz Cloud public API base URL: `https://api.postiz.com/public/v1`.
- API keys are created at **Settings > Developers > Public API**.
- The channel IDs shown in the UI are called integrations by the public API.

## Manual connection checklist

OAuth and account ownership steps require a human account holder. Do not fake success or invent IDs.

1. Sign in to Postiz.
2. Open **Settings > Developers > Public API** and generate a Postiz API key. The public API expects that key directly in the `Authorization` header, not as a `Bearer` token.
3. Connect the following channels in Postiz and copy each channel/account ID:
   - Instagram via Facebook Business OAuth
   - Facebook Page for La Monarca Internacional
   - X / Twitter `@lamonarcaintl`
   - Threads via Instagram OAuth
   - Bluesky `@lamonarcaintl.bsky.social` using an app password
   - LinkedIn company page, if available
4. Store the values in `.env.local` and in deployment secrets.
5. Run the setup checker:

   ```bash
   npm run postiz:check
   ```

6. Restart the Vite app so `import.meta.env` values are reloaded.

The checker masks configured values in terminal output and fails until all required Postiz variables are present. It does not create Postiz credentials or complete OAuth for you; those steps must still happen in Postiz.

## Optional postiz-agent CLI setup

Clone and configure the Postiz agent outside this repository unless you intentionally vendor it:

```bash
git clone https://github.com/gitroomhq/postiz-agent ../postiz-agent
cd ../postiz-agent
npm install
cat > .env <<'ENV'
POSTIZ_BASE_URL=https://api.postiz.com/public/v1
POSTIZ_API_KEY=<postiz-api-key>
POSTIZ_IG_ID=<instagram-channel-id>
POSTIZ_FB_ID=<facebook-channel-id>
POSTIZ_X_ID=<x-channel-id>
POSTIZ_THREADS_ID=<threads-channel-id>
POSTIZ_BSKY_ID=<bluesky-channel-id>
POSTIZ_LI_ID=<linkedin-channel-id>
ENV
npx postiz-agent --test
```

If a platform requires a phone, email, or account-owner approval during OAuth, skip that platform temporarily and record it as pending rather than committing placeholder IDs.
