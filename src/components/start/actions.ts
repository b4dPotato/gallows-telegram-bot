import { createAction, getPayload } from "@utils/actions";
import { sleep } from "@utils/common";
import { updateLanguage } from "@utils/language";
import { Language } from "types";
import { AppContext } from "types/telegraf-context";
import { getAccountConfirmKeyboard } from "./keyboards";

export const LANGUAGE_CHANGE = "language_change";

export const createLanguageChange = (lang: Language) =>
  createAction(LANGUAGE_CHANGE, [lang]);
export const handleLanguageChange = async (ctx: AppContext) => {
  const [lang] = getPayload(ctx.callbackQuery!.data || "");
  await updateLanguage(ctx, lang as Language);
  const accountConfirmKeyboard = getAccountConfirmKeyboard(ctx);
  accountConfirmKeyboard.disable_web_page_preview = true;

  await ctx.reply(ctx.i18n.t("scenes.start.new_account"));
  await sleep(3);
  await ctx.reply(
    ctx.i18n.t("scenes.start.bot_description"),
    accountConfirmKeyboard
  );

  await ctx.answerCbQuery();
};

export const CONFIRM_ACCOUNT = "confirm_account";
export const createConfirmAccount = () => createAction(LANGUAGE_CHANGE);
export const handleConfirmAccount = async (ctx: AppContext) => {
  await ctx.answerCbQuery();
  ctx.scene.leave();
};
