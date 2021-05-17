import { updateUserActivity } from "@services/user-serivce";
import { AppContext } from "types/telegraf-context";

/**
 * Updated last activity timestamp for the user in database
 * @param ctx - telegram context
 * @param next - next function
 */
export const updateUserTimestamp = async (ctx: AppContext, next: Function) => {
  await updateUserActivity(ctx.from!.id);

  return next();
};
