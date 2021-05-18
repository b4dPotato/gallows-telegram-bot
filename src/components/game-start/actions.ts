import { createAction, getPayload } from '@utils/actions'
import { AppContext } from 'types/telegraf-context'

export const SET_TOPIC = 'set_topic'
export const createSetTopic = (topic: string) => createAction(SET_TOPIC, [topic])
export const handleTopicSet = async (ctx: AppContext) => {
  const [topic] = getPayload(ctx.callbackQuery!.data || '')
  console.log(topic)
}
