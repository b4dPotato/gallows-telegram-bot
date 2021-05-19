import { Markup } from 'telegraf'
import { TOPICS } from '@constants/index'
import { createSetTopic } from './actions'

export const getChooseTopicKeyboard = () => {
  const inlineKeyboardBody = [
    ...Object.keys(TOPICS).map((key: string) => [Markup.callbackButton(TOPICS[key], createSetTopic(key))])
  ]
  const createGetProductsInlineBodyKeyboard = Markup.inlineKeyboard(inlineKeyboardBody).resize().extra()

  return {
    createGetProductsInlineBodyKeyboard
  }
}
