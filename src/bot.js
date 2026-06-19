const { Telegraf, session } = require('telegraf');
const config = require('./config');
const { getMainKeyboard, getContactKeyboard, getLanguageKeyboard, getBackKeyboard } = require('./keyboards');
const { getDemoSteps } = require('./demo-flow');

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

async function runDemoFlow(ctx) {
  const language = ctx.session.language || config.DEFAULT_LANGUAGE;
  const messages = getMessages(language);
  const steps = getDemoSteps(messages);

  await ctx.reply(messages.demo.intro);

  for (const step of steps) {
    await ctx.reply(step);
  }

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
