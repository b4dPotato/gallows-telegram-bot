import { createAction, getPayload } from '@utils/actions'
import { AppContext } from 'types/telegraf-context'
import { TOPICS } from '@constants/index'

export const SET_TOPIC = 'set_topic'
export const createSetTopic = (topic: string) => createAction(SET_TOPIC, [topic])
export const handleTopicSet = async (ctx: AppContext) => {
  const [topic] = getPayload(ctx.callbackQuery!.data || '')
  await ctx.reply(ctx.i18n.t('scenes.game-start.topic-choise', { topic: TOPICS[topic] }))
  ctx.scene.leave()
}
