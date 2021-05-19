import dotenv from 'dotenv'
import 'module-alias/register'
dotenv.config()

import fs from 'fs'
import path from 'path'
import rp from 'request-promise'
import Telegraf, { Context, Extra, Markup } from 'telegraf'
import session from 'telegraf/session'
import TelegrafI18n, { match } from 'telegraf-i18n'
import Stage from 'telegraf/stage'

import telegramConfig from '@configs/telegram'

import startScene from './components/start'
import gameStartScene from './components/game-start'
import gameProcessScene from './components/game-process'

import asyncWrapper from './utils/error-handler'
import { getMainKeyboard } from './utils/keyboards'
import logger from './utils/logger'

import { AppContext } from 'types/telegraf-context'
import Telegram from './telegram'

const bot = new Telegraf<AppContext>(telegramConfig.BOT_TOKEN)
const stage = new Stage([startScene, gameStartScene, gameProcessScene])
const i18n = new TelegrafI18n({
  defaultLanguage: 'en',
  directory: path.resolve(`${__dirname}/locales`),
  useSession: true,
  allowMissing: false,
  sessionName: 'session'
})

console.log(bot)

bot.use(session())
bot.use(i18n.middleware())
bot.use(stage.middleware())

bot.command('saveme', async (ctx: AppContext) => {
  logger.debug(ctx, 'User uses /saveme command')

  const { mainKeyboard } = getMainKeyboard(ctx)
  await ctx.reply(ctx.i18n.t('shared.what_next'), mainKeyboard)
})

bot.start(asyncWrapper(async (ctx: AppContext) => ctx.scene.enter('start')))

bot.hears(
  match('keyboards.main-keyboard.start-game'),
  asyncWrapper(async (ctx: AppContext) => ctx.scene.enter('game-start'))
)

bot.hears(/(.*?)/, async (ctx: AppContext) => {
  logger.debug(ctx, 'Default handler has fired')

  const { mainKeyboard } = getMainKeyboard(ctx)
  await ctx.reply(ctx.i18n.t('other.default_handler'), mainKeyboard)
})

bot.catch((error: any) => {
  logger.error(undefined, 'Global error has happened, %O', error)
})

process.env.NODE_ENV === 'production' ? startProdMode(bot) : startDevMode(bot)

function startDevMode(bot: Telegraf<any>) {
  logger.debug(undefined, 'Starting a bot in development mode')

  rp(`https://api.telegram.org/bot${telegramConfig.BOT_TOKEN}/deleteWebhook`).then(() => bot.startPolling())
}

async function startProdMode(bot: Telegraf<any>) {
  // If webhook not working, check fucking motherfucking UFW that probably blocks a port...
  logger.debug(undefined, 'Starting a bot in production mode')
  const tlsOptions = {
    key: fs.readFileSync(telegramConfig.PATH_TO_KEY),
    cert: fs.readFileSync(telegramConfig.PATH_TO_CERT)
  }

  await bot.telegram.setWebhook(`https://dmbaranov.io:${telegramConfig.WEBHOOK_PORT}/${telegramConfig.BOT_TOKEN}`, {
    source: 'cert.pem'
  })

  await bot.startWebhook(`/${telegramConfig.BOT_TOKEN}`, tlsOptions, +telegramConfig.WEBHOOK_PORT)

  const webhookStatus = await Telegram.getWebhookInfo()
  console.log('Webhook status', webhookStatus)
}
