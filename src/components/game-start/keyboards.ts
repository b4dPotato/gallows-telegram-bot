import { Markup } from 'telegraf'
import { TOPICS } from '@constants/index'
import { createSetTopic } from './actions'

export const getChooseTopicKeyboard = () => {
  const inlineKeyboard = [
    ...Object.keys(TOPICS).map((key: string) => [Markup.callbackButton(TOPICS[key], createSetTopic(key))])
  ]
  const createChooseTopicKeyboard = Markup.inlineKeyboard(inlineKeyboard).resize().extra()

  return {
    createChooseTopicKeyboard
  }
}
