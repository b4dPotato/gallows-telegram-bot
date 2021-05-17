import dotenv from "dotenv";
import "module-alias/register";
dotenv.config();

import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import rp from "request-promise";
import Telegraf, { Context, Extra, Markup } from "telegraf";
import TelegrafI18n, { match } from "telegraf-i18n";
import session from "telegraf/session";
import Stage from "telegraf/stage";

import mongoConfig from "@configs/mongo";
import telegramConfig from "@configs/telegram";

import UserModel from "@models/user";

import createProductScene from "./components/create-product";
import getProductsScene from "./components/get-products";
import startScene from "./components/start";

import asyncWrapper from "./utils/error-handler";
import { getMainKeyboard } from "./utils/keyboards";
import { updateLanguage } from "./utils/language";
import logger from "./utils/logger";

import { setLanguage } from "./middlewares/set-language";
import { updateUserTimestamp } from "./middlewares/update-user-timestamp";

import { AppContext } from "types/telegraf-context";
import Telegram from "./telegram";

mongoose.connect(mongoConfig.DATABASE_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.connection.on("error", (err) => {
  logger.error(
    undefined,
    `Error occurred during an attempt to establish connection with the database: %O`,
    err
  );
  process.exit(1);
});

mongoose.connection.on("open", () => {
  const bot = new Telegraf<AppContext>(telegramConfig.BOT_TOKEN);
  const stage = new Stage([startScene, createProductScene, getProductsScene]);
  const i18n = new TelegrafI18n({
    defaultLanguage: "en",
    directory: path.resolve(`${__dirname}/locales`),
    useSession: true,
    allowMissing: false,
    sessionName: "session",
  });

  bot.use(session());
  bot.use(i18n.middleware());
  bot.use(stage.middleware());
  bot.use(setLanguage);

  bot.command("saveme", async (ctx: AppContext) => {
    logger.debug(ctx, "User uses /saveme command");

    const { mainKeyboard } = getMainKeyboard(ctx);
    await ctx.reply(ctx.i18n.t("shared.what_next"), mainKeyboard);
  });
  bot.start(asyncWrapper(async (ctx: AppContext) => ctx.scene.enter("start")));
  bot.hears(
    match("keyboards.main_keyboard.create_product"),
    updateUserTimestamp,
    asyncWrapper(async (ctx: AppContext) => ctx.scene.enter("create_product"))
  );
  bot.hears(
    match("keyboards.main_keyboard.get_products"),
    updateUserTimestamp,
    asyncWrapper(async (ctx: AppContext) => ctx.scene.enter("get_products"))
  );
  bot.hears(
    match("keyboards.back_keyboard.back"),
    asyncWrapper(async (ctx: AppContext) => {
      // If this method was triggered, it means that bot was updated when user was not in the main menu..
      logger.debug(ctx, "Return to the main menu with the back button");
      const { mainKeyboard } = getMainKeyboard(ctx);

      await ctx.reply(ctx.i18n.t("shared.what_next"), mainKeyboard);
    })
  );

  bot.hears(/(.*?)/, async (ctx: AppContext) => {
    logger.debug(ctx, "Default handler has fired");
    const user = await UserModel.findById(ctx.from!.id);
    await updateLanguage(ctx, user!.language);

    const { mainKeyboard } = getMainKeyboard(ctx);
    await ctx.reply(ctx.i18n.t("other.default_handler"), mainKeyboard);
  });

  bot.catch((error: any) => {
    logger.error(undefined, "Global error has happened, %O", error);
  });

  process.env.NODE_ENV === "production"
    ? startProdMode(bot)
    : startDevMode(bot);
});

function startDevMode(bot: Telegraf<any>) {
  logger.debug(undefined, "Starting a bot in development mode");

  rp(
    `https://api.telegram.org/bot${telegramConfig.BOT_TOKEN}/deleteWebhook`
  ).then(() => bot.startPolling());
}

async function startProdMode(bot: Telegraf<any>) {
  // If webhook not working, check fucking motherfucking UFW that probably blocks a port...
  logger.debug(undefined, "Starting a bot in production mode");
  const tlsOptions = {
    key: fs.readFileSync(telegramConfig.PATH_TO_KEY),
    cert: fs.readFileSync(telegramConfig.PATH_TO_CERT),
  };

  await bot.telegram.setWebhook(
    `https://dmbaranov.io:${telegramConfig.WEBHOOK_PORT}/${telegramConfig.BOT_TOKEN}`,
    {
      source: "cert.pem",
    }
  );

  await bot.startWebhook(
    `/${telegramConfig.BOT_TOKEN}`,
    tlsOptions,
    +telegramConfig.WEBHOOK_PORT
  );

  const webhookStatus = await Telegram.getWebhookInfo();
  console.log("Webhook status", webhookStatus);
}
