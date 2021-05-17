// Add some general info, like isPremium, language, etc...
import { AppContext } from "types/telegraf-context";

/**
 * Modifies context and add some information about the user
 * @param ctx - telegram context
 * @param next - next function
 */
export const setLanguage = async (ctx: AppContext, next: Function) => {
  if (ctx.session && !ctx.session.language) {
  }

  return next();
};
