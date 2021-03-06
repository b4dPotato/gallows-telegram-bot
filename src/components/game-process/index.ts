import { BaseScene as Scene } from 'telegraf'
import { match } from 'telegraf-i18n'
import { AppContext } from 'types/telegraf-context'

import { onlyOneLetter, сyrillicRequired } from '@utils/validation'
import { getBackKeyboard, getMainKeyboard } from '@utils/keyboards'
import asyncWrapper from '@utils/error-handler'

import Game from '@services/game'

const gameProcess = new Scene<AppContext>('game-process')

gameProcess.enter(async (ctx: AppContext) => {
  let game = new Game(ctx)
  ctx.session.game = game

  const { backKeyboard } = getBackKeyboard(ctx)
  await ctx.reply(ctx.i18n.t('scenes.start.game-description'), backKeyboard)

  const state = ctx.scene.state
  game.startGame(state.topic)
})

gameProcess.start(async (ctx: AppContext) => {
  await ctx.scene.leave()
  await ctx.scene.enter('start')
})

gameProcess.hears(
  match('keyboards.back-keyboard.back'),
  asyncWrapper(async (ctx: AppContext) => {
    ctx.scene.leave()
    const { mainKeyboard } = getMainKeyboard(ctx)
    await ctx.reply(ctx.i18n.t('keyboards.back-keyboard.end-game'), mainKeyboard)
  })
)

gameProcess.on('text', async (ctx: AppContext) => {
  const text = ctx.message?.text!
  const game = ctx.session.game
  const valid = (await сyrillicRequired(ctx, text)) && (await onlyOneLetter(ctx, text))
  if (!valid) return

  await game.tryPutLetter(text)
  if (!game.isGameProcess) {
    await ctx.scene.leave()
  }
})

export default gameProcess
