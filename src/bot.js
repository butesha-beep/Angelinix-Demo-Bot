const path = require('path');
const { Telegraf, session, Input } = require('telegraf');
const config = require('./config');
const { getMainKeyboard, getContactKeyboard, getLanguageKeyboard, getBackKeyboard } = require('./keyboards');

const demoScreenshots = {
  dashboard: path.join(__dirname, 'assets', 'screenshots', 'angelinix-master-dashboard.jpg'),
  clients: path.join(__dirname, 'assets', 'screenshots', 'angelinix-master-clients.jpg'),
  analytics: path.join(__dirname, 'assets', 'screenshots', 'angelinix-master-analytics.jpg'),
  dealMarketBot: {
    home: path.join(__dirname, 'assets', 'screenshots', 'deal-market-bot-home.jpg'),
    product: path.join(__dirname, 'assets', 'screenshots', 'deal-market-bot-product.jpg'),
    cart: path.join(__dirname, 'assets', 'screenshots', 'deal-market-bot-cart.jpg')
  },
  dealMarketAdmin: {
    dashboard: path.join(__dirname, 'assets', 'screenshots', 'deal-market-dashboard.jpg'),
    funnelOrders: path.join(__dirname, 'assets', 'screenshots', 'deal-market-funnel-orders.jpg'),
    salesAnalytics: path.join(__dirname, 'assets', 'screenshots', 'deal-market-sales-analytics.jpg')
  }
};

function getMessages(language = config.DEFAULT_LANGUAGE) {
  if (language === 'ru') {
    return require('./messages/ru');
  }

  return require('./messages/en');
}

function createBot() {
  if (!config.TELEGRAM_BOT_TOKEN) {
    console.warn('TELEGRAM_BOT_TOKEN is not set. Bot will be disabled.');
    return null;
  }

  return new Telegraf(config.TELEGRAM_BOT_TOKEN);
}

async function sendMainMenu(ctx) {
  const language = ctx.session.language || config.DEFAULT_LANGUAGE;
  const messages = getMessages(language);
  await ctx.reply(messages.start, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    ...getMainKeyboard(messages)
  });
}

async function sendSection(ctx, section) {
  const language = ctx.session.language || config.DEFAULT_LANGUAGE;
  const messages = getMessages(language);
  const sectionText = messages.sections[section];

  if (!sectionText) {
    return;
  }

  await ctx.reply(sectionText, {
    parse_mode: 'HTML',
    ...getBackKeyboard(messages)
  });
}

async function sendAngelinixMasterSection(ctx) {
  const language = ctx.session.language || config.DEFAULT_LANGUAGE;
  const messages = getMessages(language);

  await ctx.reply(messages.angelinixMaster.intro, {
    parse_mode: 'HTML'
  });
  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.dashboard), {
    caption: messages.demo.screenshots.dashboard
  });
  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.clients), {
    caption: messages.demo.screenshots.clients
  });
  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.analytics), {
    caption: messages.demo.screenshots.analytics
  });
  await ctx.reply(messages.angelinixMaster.summary, {
    parse_mode: 'HTML',
    ...getBackKeyboard(messages)
  });
}

async function sendDealMarketAdminSection(ctx) {
  const language = ctx.session.language || config.DEFAULT_LANGUAGE;
  const messages = getMessages(language);

  await ctx.reply(messages.dealMarketAdmin.intro, {
    parse_mode: 'HTML'
  });
  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.dealMarketAdmin.dashboard), {
    caption: messages.dealMarketAdmin.screenshots.dashboard
  });
  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.dealMarketAdmin.funnelOrders), {
    caption: messages.dealMarketAdmin.screenshots.funnelOrders
  });
  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.dealMarketAdmin.salesAnalytics), {
    caption: messages.dealMarketAdmin.screenshots.salesAnalytics
  });
  await ctx.reply(messages.dealMarketAdmin.summary, {
    parse_mode: 'HTML',
    ...getBackKeyboard(messages)
  });
}

async function sendDealMarketBotSection(ctx) {
  const language = ctx.session.language || config.DEFAULT_LANGUAGE;
  const messages = getMessages(language);

  await ctx.reply(messages.dealMarketBot.intro, {
    parse_mode: 'HTML'
  });
  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.dealMarketBot.home), {
    caption: messages.dealMarketBot.screenshots.home
  });
  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.dealMarketBot.product), {
    caption: messages.dealMarketBot.screenshots.product
  });
  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.dealMarketBot.cart), {
    caption: messages.dealMarketBot.screenshots.cart
  });
  await ctx.reply(messages.dealMarketBot.summary, {
    parse_mode: 'HTML',
    ...getBackKeyboard(messages)
  });
}

async function runDemoFlow(ctx) {
  const language = ctx.session.language || config.DEFAULT_LANGUAGE;
  const messages = getMessages(language);

  await ctx.reply(messages.demo.intro);

  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.dashboard), {
    caption: messages.demo.tour.angelinixMaster
  });
  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.dealMarketAdmin.dashboard), {
    caption: messages.demo.tour.dealMarketAdmin
  });
  await ctx.replyWithPhoto(Input.fromLocalFile(demoScreenshots.dealMarketBot.home), {
    caption: messages.demo.tour.dealMarketBot
  });

  await ctx.reply(messages.demo.final, {
    ...getContactKeyboard(messages)
  });
}

function setupBotHandlers(bot) {
  bot.use(session());

  bot.use(async (ctx, next) => {
    if (!ctx.session) {
      ctx.session = {};
    }

    ctx.session.language = ctx.session.language || config.DEFAULT_LANGUAGE;
    await next();
  });

  bot.start(async (ctx) => {
    await sendMainMenu(ctx);
  });

  bot.help(async (ctx) => {
    await sendMainMenu(ctx);
  });

  bot.action('main_menu', async (ctx) => {
    await sendMainMenu(ctx);
  });

  bot.action('demo:start', async (ctx) => {
    await ctx.answerCbQuery();
    await runDemoFlow(ctx);
  });

  bot.action('section:angelinix_master', async (ctx) => {
    await ctx.answerCbQuery();
    await sendAngelinixMasterSection(ctx);
  });

  bot.action('section:dashboard', async (ctx) => {
    await ctx.answerCbQuery();
    await sendSection(ctx, 'dashboard');
  });

  bot.action('section:clients', async (ctx) => {
    await ctx.answerCbQuery();
    await sendSection(ctx, 'clients');
  });

  bot.action('section:projects', async (ctx) => {
    await ctx.answerCbQuery();
    await sendSection(ctx, 'projects');
  });

  bot.action('section:analytics', async (ctx) => {
    await ctx.answerCbQuery();
    await sendSection(ctx, 'analytics');
  });

  bot.action('section:automation', async (ctx) => {
    await ctx.answerCbQuery();
    await sendSection(ctx, 'automation');
  });

  bot.action('section:pricing', async (ctx) => {
    await ctx.answerCbQuery();
    await sendSection(ctx, 'pricing');
  });

  bot.action('section:deal_market_admin', async (ctx) => {
    await ctx.answerCbQuery();
    await sendDealMarketAdminSection(ctx);
  });

  bot.action('section:deal_market_bot', async (ctx) => {
    await ctx.answerCbQuery();
    await sendDealMarketBotSection(ctx);
  });

  bot.action('section:contact', async (ctx) => {
    await ctx.answerCbQuery();
    const language = ctx.session.language || config.DEFAULT_LANGUAGE;
    const messages = getMessages(language);
    await ctx.reply(messages.sections.contact, {
      ...getContactKeyboard(messages)
    });
  });

  bot.action('language:toggle', async (ctx) => {
    await ctx.answerCbQuery();
    const language = ctx.session.language || config.DEFAULT_LANGUAGE;
    const messages = getMessages(language);
    await ctx.reply(messages.languageChanged, {
      ...getLanguageKeyboard()
    });
  });

  bot.action(/language:(en|ru)/, async (ctx) => {
    const selected = ctx.match[1];
    ctx.session.language = selected;
    await ctx.answerCbQuery();

    const messages = getMessages(selected);
    await ctx.reply(messages.languageChanged, {
      ...getMainKeyboard(messages)
    });
  });
}

module.exports = {
  createBot,
  setupBotHandlers
};
