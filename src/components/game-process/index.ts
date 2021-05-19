import { getChooseTopicKeyboard } from './keyboards'
import { BaseScene as Scene } from 'telegraf'
import { AppContext } from 'types/telegraf-context'
import { SET_TOPIC, handleTopicSet } from './actions'
import { TOPICS } from '@constants/index'
import path from 'path'

const gameProcess = new Scene<AppContext>('game-process')

gameProcess.enter(async (ctx: AppContext) => {
  console.log(ctx.scene.state)
  const imgPath = path.join(__dirname, '../../images/hangman-0.png')

  await ctx.reply(ctx.i18n.t('scenes.game-process.your-word', { n: 5 }))
  await ctx.replyWithPhoto({
    source: imgPath
  })
})

export default gameProcess
