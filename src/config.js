require('dotenv').config();

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_BASE_URL = (process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');

module.exports = {
  PORT,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET || 'demo-secret',
  PUBLIC_BASE_URL,
  CONTACT_TELEGRAM_URL: process.env.CONTACT_TELEGRAM_URL || 'https://t.me/angelinix',
  CONTACT_WHATSAPP_URL: process.env.CONTACT_WHATSAPP_URL || 'https://wa.me/15551234567',
  LANDING_URL: process.env.LANDING_URL || 'https://angelinix.example.com',
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE || 'en'
};
