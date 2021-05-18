import { Markup } from 'telegraf'
import { AppContext } from 'types/telegraf-context'
import { TOPICS } from '@constants/index'
import { createSetTopic } from './actions'

export const getChooseTopicKeyboard = (ctx: AppContext) => {
  const inlineButtons = Object.keys(TOPICS).map((key: string) => [
    Markup.callbackButton(TOPICS[key], createSetTopic(key))
  ])

  const inlineKeyboardBody = [...inlineButtons]
  const createGetProductsInlineBodyKeyboard = Markup.inlineKeyboard(inlineKeyboardBody).resize().extra()

  return {
    createGetProductsInlineBodyKeyboard
  }
}
