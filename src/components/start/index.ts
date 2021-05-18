import { getMainKeyboard } from '@utils/keyboards'
import { BaseScene as Scene, Stage } from 'telegraf'
import { AppContext } from 'types/telegraf-context'

const { leave } = Stage
const start = new Scene<AppContext>('start')

start.enter(async (ctx: AppContext) => {
  const { mainKeyboard } = getMainKeyboard(ctx)
  await ctx.reply(ctx.i18n.t('scenes.start.game-description'), mainKeyboard)
  leave()
})

export default start
