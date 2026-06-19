# Angelinix Demo Bot

A safe public Telegram demo bot MVP for showcasing an agency workflow without using real client data.

## Features
- Static scripted demo flow
- EN / RU language support
- Express webhook server with `/health`
- No database, CRM, payments, or admin commands

## Environment variables
Copy [.env.example](.env.example) to `.env` and fill in the values.

- `TELEGRAM_BOT_TOKEN` — Telegram bot token
- `TELEGRAM_WEBHOOK_SECRET` — webhook secret used in the path
- `PUBLIC_BASE_URL` — public URL for the webhook
- `PORT` — server port
- `CONTACT_TELEGRAM_URL` — contact link
- `CONTACT_WHATSAPP_URL` — contact link
- `LANDING_URL` — landing page URL
- `DEFAULT_LANGUAGE` — `en` or `ru`

## Local development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file from the example.
3. Start the server:
   ```bash
   npm start
   ```
4. For development with auto-reload:
   ```bash
   npm run dev
   ```

## Health check
The server exposes:
- `GET /health` → returns `OK`

## Telegram webhook setup
1. Set a public URL for your app.
2. Set the webhook with your bot token:
   ```bash
   curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=<PUBLIC_BASE_URL>/bot/<TELEGRAM_WEBHOOK_SECRET>"
   ```
3. Verify with:
   ```bash
   curl https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getWebhookInfo
   ```

## Railway deployment
1. Create a new Railway project.
2. Link the repository.
3. Add the environment variables from `.env.example`.
4. Set the start command to:
   ```bash
   npm start
   ```
5. Railway will expose the app and provide the public URL used for the webhook.

## Notes
- All demo content is scripted and sanitized.
- No real CRM, payments, or personal data are used.
