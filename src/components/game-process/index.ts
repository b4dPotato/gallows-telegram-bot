import Game from '@services/game'
import { getLetterViewerKeyboard } from './keyboards'
import { BaseScene as Scene } from 'telegraf'
import { AppContext } from 'types/telegraf-context'
import { onlyOneLetter, сyrillicRequired } from '@utils/validation'
import { getBackKeyboard } from '@utils/keyboards'

const gameProcess = new Scene<AppContext>('game-process')
let game = new Game()

gameProcess.enter(async (ctx: AppContext) => {
  const { backKeyboard } = getBackKeyboard(ctx)
  await ctx.reply(ctx.i18n.t('scenes.start.game-description'), backKeyboard)

  const state = ctx.scene.state
  const randomWord = game.getRandomWord(state.topic)

  await ctx.replyWithPhoto({
    source: game.getAssociatedImgPath()
  })
  await ctx.reply(
    ctx.i18n.t('scenes.game-process.your-word', { n: randomWord.length }),
    getLetterViewerKeyboard(game.wordSkelet).createLetterViewerKeyboard
  )
})

gameProcess.on('text', async (ctx: AppContext) => {
  const { text } = ctx.message
  if (!сyrillicRequired(ctx, text) || !onlyOneLetter(ctx, text)) return
  if (game.isLetterInWord(text)) {
    game.matchWordWithLetter(text)
    await ctx.reply(
      ctx.i18n.t('scenes.game-process.letter-guessed', { letter: text }),
      getLetterViewerKeyboard(game.wordSkelet).createLetterViewerKeyboard
    )
  } else {
    game.attempts--
    await ctx.reply(ctx.i18n.t('scenes.game-process.letter-not-guessed'))
    await ctx.replyWithPhoto({
      source: game.getAssociatedImgPath()
    })
  }
})

export default gameProcess
