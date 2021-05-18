import { getMainKeyboard } from '@utils/keyboards'
import { getChooseTopicKeyboard } from './keyboards'
import { BaseScene as Scene, Stage } from 'telegraf'
import { AppContext } from 'types/telegraf-context'
import { SET_TOPIC, handleTopicSet } from './actions'

const { leave } = Stage
const gameStart = new Scene<AppContext>('game-start')

gameStart.enter(async (ctx: AppContext) => {
  await ctx.reply(
    ctx.i18n.t('scenes.game-start.choose-topic'),
    getChooseTopicKeyboard(ctx).createGetProductsInlineBodyKeyboard
  )
})

gameStart.action(RegExp(SET_TOPIC), handleTopicSet)

export default gameStart
