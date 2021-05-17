import { Markup } from "telegraf";
import { AppContext } from "types/telegraf-context";

/**
 * Returns main keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getCreateProductKeyboard = (ctx: AppContext) => {
  const createProductKeyboardNext = ctx.i18n.t(
    "keyboards.create_product_keyboard.done"
  );
  const createProductKeyboard = Markup.keyboard([
    [createProductKeyboardNext] as any,
  ])
    .resize()
    .extra();

  return {
    createProductKeyboard,
    createProductKeyboardNext,
  };
};
