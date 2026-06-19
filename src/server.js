const express = require('express');
const config = require('./config');
const { createBot, setupBotHandlers } = require('./bot');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Angelinix Demo Bot'
  });
});

const bot = createBot();

if (bot) {
  setupBotHandlers(bot);
  app.use(bot.webhookCallback(`/bot/${config.TELEGRAM_WEBHOOK_SECRET}`));
}

app.listen(config.PORT, async () => {
  console.log(`Server running on port ${config.PORT}`);

  if (bot) {
    try {
      await bot.telegram.setWebhook(
        `${config.PUBLIC_BASE_URL}/bot/${config.TELEGRAM_WEBHOOK_SECRET}`
      );
      console.log('Webhook configured successfully.');
    } catch (error) {
      console.warn('Could not set Telegram webhook:', error.message);
    }
  } else {
    console.warn(
      'TELEGRAM_BOT_TOKEN is not set. Start the server without Telegram webhook support.'
    );
  }
});
