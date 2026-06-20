const { Markup } = require('telegraf');
const config = require('./config');

function getMainKeyboard(messages) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(messages.menu.demo, 'demo:start')],
    [Markup.button.callback(messages.menu.angelinixMaster, 'section:angelinix_master')],
    [Markup.button.callback(messages.menu.dealMarketAdmin, 'section:deal_market_admin')],
    [Markup.button.callback(messages.menu.dealMarketBot, 'section:deal_market_bot')],
    [Markup.button.callback(messages.menu.capabilities, 'section:capabilities')],
    [Markup.button.callback(messages.menu.pricing, 'section:pricing')],
    [Markup.button.callback(messages.menu.contact, 'section:contact')],
    [Markup.button.callback(messages.menu.language, 'language:toggle')]
  ]);
}

function getBackKeyboard(messages) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(messages.menu.back, 'main_menu')]
  ]);
}

function getLanguageKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🇺🇸 English', 'language:en')],
    [Markup.button.callback('🇷🇺 Русский', 'language:ru')]
  ]);
}

function getContactKeyboard(messages) {
  const keyboard = [
    [Markup.button.url(messages.contactButtons.telegram, config.CONTACT_TELEGRAM_URL)],
    [Markup.button.url(messages.contactButtons.whatsapp, config.CONTACT_WHATSAPP_URL)],
    [Markup.button.url(messages.contactButtons.landing, config.LANDING_URL)]
  ];

  return Markup.inlineKeyboard(keyboard);
}

module.exports = {
  getMainKeyboard,
  getBackKeyboard,
  getLanguageKeyboard,
  getContactKeyboard
};
