import { Markup } from 'telegraf'
import { AppContext } from 'types/telegraf-context'
import { TOPICS } from '@constants/index'

export const getChooseTopicKeyboard = (ctx: AppContext) => {
  const inlineButtons = Object.keys(TOPICS).map((key: string) => [Markup.callbackButton(TOPICS[key], 'delete')])

  const inlineKeyboardBody = [...inlineButtons]
  const createGetProductsInlineBodyKeyboard = Markup.inlineKeyboard(inlineKeyboardBody).resize().extra()

  return {
    createGetProductsInlineBodyKeyboard
  }
}
