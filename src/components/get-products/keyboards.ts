import { Markup } from "telegraf";
import { AppContext } from "types/telegraf-context";
import { Product } from "@models/product";

/**
 * Returns main keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getProductsKeyboard = (
  ctx: AppContext,
  entities: Array<Product>
) => {
  // TODO: Handle NO_ACTION, for correct display of buttons for the user
  const NO_ACTION = '__NO_ACTION__'

  const inlineKeyboardHeader = [
    [ 
      Markup.callbackButton(ctx.i18n.t("keyboards.get_products_inline_keyboard.lbl_name"), NO_ACTION),
      Markup.callbackButton(ctx.i18n.t("keyboards.get_products_inline_keyboard.lbl_price"), NO_ACTION),
      Markup.callbackButton(ctx.i18n.t("keyboards.get_products_inline_keyboard.action_delete"), NO_ACTION),
      Markup.callbackButton(ctx.i18n.t("keyboards.get_products_inline_keyboard.action_edit"), NO_ACTION),
    ],
  ]

  const inlineKeyboardBody = entities.map((item: Product) => {
    const { name, price, currency } = item;
    // TODO: Provide all required actions, for each inline-keyboard button
    return [
      Markup.callbackButton(`${name}`, "showProduct"),
      Markup.callbackButton(`${price} ${currency}`, "showProduct"),
      Markup.callbackButton('❌', "delete"),
      Markup.callbackButton('✏️', "edit"),
    ];
  })

  const createGetProductsInlineHeaderKeyboard = Markup.inlineKeyboard(
    inlineKeyboardHeader,
  )
    .resize()
    .extra();

  const createGetProductsInlineBodyKeyboard = Markup.inlineKeyboard(
    inlineKeyboardBody
  )
    .resize()
    .extra();

  return {
    createGetProductsInlineHeaderKeyboard,
    createGetProductsInlineBodyKeyboard,
  };
};
