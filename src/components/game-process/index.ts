import { getLetterViewerKeyboard } from './keyboards'
import { BaseScene as Scene } from 'telegraf'
import { AppContext } from 'types/telegraf-context'
import { getRandomWord } from '@services/game-service'
import path from 'path'

const gameProcess = new Scene<AppContext>('game-process')

gameProcess.enter(async (ctx: AppContext) => {
  const state = ctx.scene.state
  const randomWord = getRandomWord(state.topic)
  console.log(randomWord)

  const imgPath = path.join(__dirname, '../../images/empty.png')
  await ctx.reply(
    ctx.i18n.t('scenes.game-process.your-word', { n: randomWord.length }),
    getLetterViewerKeyboard(randomWord).createLetterViewerKeyboard
  )
  await ctx.replyWithPhoto({
    source: imgPath
  })
})

export default gameProcess
