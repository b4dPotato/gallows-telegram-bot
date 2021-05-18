import { getMainKeyboard } from '@utils/keyboards'
import { getChooseTopicKeyboard } from './keyboards'
import logger from '@utils/logger'
import { BaseScene as Scene, Stage } from 'telegraf'
import { AppContext } from 'types/telegraf-context'

const { leave } = Stage
const gameStart = new Scene<AppContext>('game-start')

gameStart.enter(async (ctx: AppContext) => {
  await ctx.reply(
    ctx.i18n.t('scenes.game-start.choose-topic'),
    getChooseTopicKeyboard(ctx).createGetProductsInlineBodyKeyboard
  )
})

export default gameStart
