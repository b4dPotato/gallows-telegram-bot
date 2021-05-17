import { Markup } from "telegraf";
import { AppContext } from "types/telegraf-context";

/**
 * Returns back keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getBackKeyboard = (ctx: AppContext) => {
  const backKeyboardBack = ctx.i18n.t("keyboards.back_keyboard.back");
  let backKeyboard: any = Markup.keyboard([backKeyboardBack]);

  backKeyboard = backKeyboard.resize().extra();

  return {
    backKeyboard,
    backKeyboardBack,
  };
};

/**
 * Returns main keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getMainKeyboard = (ctx: AppContext) => {
  const mainKeyboardCreateProduct = ctx.i18n.t(
    "keyboards.main_keyboard.create_product"
  );
  const mainKeyboardMyCollection = ctx.i18n.t(
    "keyboards.main_keyboard.get_products"
  );
  const mainKeyboardSettings = ctx.i18n.t("keyboards.main_keyboard.settings");
  const mainKeyboardAbout = ctx.i18n.t("keyboards.main_keyboard.about");
  const mainKeyboardSupport = ctx.i18n.t("keyboards.main_keyboard.support");
  const mainKeyboardContact = ctx.i18n.t("keyboards.main_keyboard.contact");
  const mainKeyboard = Markup.keyboard([
    [mainKeyboardCreateProduct, mainKeyboardMyCollection] as any,
    [mainKeyboardSettings, mainKeyboardAbout],
    [mainKeyboardSupport, mainKeyboardContact],
  ])
    .resize()
    .extra();

  return {
    mainKeyboard,
    mainKeyboardCreateProduct,
    mainKeyboardMyCollection,
    mainKeyboardSettings,
    mainKeyboardAbout,
    mainKeyboardSupport,
    mainKeyboardContact,
  };
};
