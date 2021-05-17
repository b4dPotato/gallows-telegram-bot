import { Markup } from "telegraf";
import { AppContext } from "types/telegraf-context";

export const getStartGameKeyboard = (ctx: AppContext,
) => {
  const inlineKeyboardBody = [
      Markup.callbackButton('EQWEWQQWEQWE', "showProduct"),
  ];

  const createGetProductsInlineBodyKeyboard = Markup.inlineKeyboard(
    inlineKeyboardBody
  )
    .resize()
    .extra();

  return {
    getStartGameKeyboard,
  };
};
