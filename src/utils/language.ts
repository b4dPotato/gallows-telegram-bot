import UserModel from "@models/user";
import { Language } from "types";
import { AppContext } from "types/telegraf-context";
import logger from "./logger";

/**
 * Function that updates language for the current user in all known places
 * @param ctx - telegram context
 * @param newLang - new language
 */
export async function updateLanguage(ctx: AppContext, newLang: Language) {
  logger.debug(ctx, "Updating language for user to %s", newLang);
  await UserModel.findOneAndUpdate(
    { _id: ctx.from!.id },
    {
      language: newLang,
    },
    { new: true }
  );

  ctx.session.language = newLang;

  ctx.i18n.locale(newLang);
}
