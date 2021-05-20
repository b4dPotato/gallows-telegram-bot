import { BaseScene as Scene } from 'telegraf'
import { match } from 'telegraf-i18n'
import { AppContext } from 'types/telegraf-context'

import { onlyOneLetter, сyrillicRequired } from '@utils/validation'
import { getBackKeyboard, getMainKeyboard } from '@utils/keyboards'
import asyncWrapper from '@utils/error-handler'
// NEED REFACTOR

import Game from '@services/game'
import User from '@services/user'

const gameProcess = new Scene<AppContext>('game-process')
let users: Array<User> = []

gameProcess.enter(async (ctx: AppContext) => {
  let user = users.find(user => ctx.chat?.id === user.id)
  if (!user) {
    let game = new Game(ctx)
    user = new User(game, ctx.chat?.id)
    users.push(user)
  }

  const { backKeyboard } = getBackKeyboard(ctx)
  await ctx.reply(ctx.i18n.t('scenes.start.game-description'), backKeyboard)

  const state = ctx.scene.state
  user.game.startGame(state.topic)
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
  const valid = (await сyrillicRequired(ctx, text)) && (await onlyOneLetter(ctx, text))
  let user = users.find(user => ctx.chat?.id === user.id)
  if (!valid || !user) return

  await user.game.tryPutLetter(ctx, text)
  if (!user.game.isGameProcess) {
    await ctx.scene.leave()
  }
})

export default gameProcess
