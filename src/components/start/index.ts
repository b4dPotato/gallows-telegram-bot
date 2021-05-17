import { createUser, findUser } from "@services/user-serivce";
import { getMainKeyboard } from "@utils/keyboards";
import logger from "@utils/logger";
import { BaseScene as Scene, Stage } from "telegraf";
import { AppContext } from "types/telegraf-context";
import {
  CONFIRM_ACCOUNT,
  handleConfirmAccount,
  handleLanguageChange,
  LANGUAGE_CHANGE,
} from "./actions";
import { getLanguageKeyboard } from "./keyboards";

const { leave } = Stage;
const start = new Scene<AppContext>("start");

start.enter(async (ctx: AppContext) => {
  const _id = String(ctx.from!.id);
  const isUser = Boolean(await findUser(_id));
  const { mainKeyboard } = getMainKeyboard(ctx);

  if (isUser) {
    await ctx.reply(ctx.i18n.t("scenes.start.welcome_back"), mainKeyboard);
  } else {
    logger.debug(ctx, "New user has been created");
    await createUser({
      _id,
      username: ctx.from!.username,
      fullname: ctx.from!.first_name + " " + ctx.from!.last_name,
    });
    await ctx.reply("Choose language / Выбери язык", getLanguageKeyboard());
  }
});

start.leave(async (ctx: AppContext) => {
  const { mainKeyboard } = getMainKeyboard(ctx);
});

start.command("saveme", leave());
start.action(RegExp(LANGUAGE_CHANGE), handleLanguageChange);
start.action(RegExp(CONFIRM_ACCOUNT), handleConfirmAccount);

export default start;
