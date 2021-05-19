import { Markup } from 'telegraf'
import { AppContext } from 'types/telegraf-context'

/**
 * Returns back keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getBackKeyboard = (ctx: AppContext) => {
  const backKeyboardBack = ctx.i18n.t('keyboards.back-keyboard.back')
  const backKeyboard = Markup.keyboard([backKeyboardBack]).resize().extra()

  return {
    backKeyboard,
    backKeyboardBack
  }
}

/**
 * Returns main keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getMainKeyboard = (ctx: AppContext) => {
  const mainKeyboardStartGame = ctx.i18n.t('keyboards.main-keyboard.start-game')
  const mainKeyboard = Markup.keyboard([mainKeyboardStartGame]).resize().extra()

  return {
    mainKeyboard
  }
}
