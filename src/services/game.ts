import { WORDS } from '@constants/index'
import { getLetterViewerKeyboard } from '@utils/keyboards'
import { getMainKeyboard } from '@utils/keyboards'

import { AppContext } from 'types/telegraf-context'
import path from 'path'

export default class Game {
  word: string
  wordSkelet: string
  letters: Array<string>
  attempts: number
  ctx: AppContext
  isGameWon: Boolean
  isGameProcess: Boolean

  constructor(ctx: AppContext) {
    this.word = ''
    this.wordSkelet = ''
    this.letters = []
    this.attempts = 7
    this.ctx = ctx
    this.isGameWon = false
    this.isGameProcess = true
  }

  async startGame(ctx: AppContext, topic: string) {
    this.ctx = ctx

    let word = this.getRandomWord(topic)
    this.initWord(word)
    console.log(word)
    await ctx.replyWithPhoto({
      source: this.getAssociatedImgPath()
    })
    await ctx.reply(
      ctx.i18n.t('game.your-word', { n: this.word.length }),
      getLetterViewerKeyboard(this.wordSkelet).createLetterViewerKeyboard
    )
  }

  async tryPutLetter(text: string) {
    const ctx = this.ctx

    if (this.letters.includes(text)) {
      await ctx.reply(ctx.i18n.t('game.letter-duplicated', { letters: this.letters }))
      return
    }

    if (this.isLetterInWord(text)) {
      this.matchWordWithLetter(text)
      await ctx.reply(
        ctx.i18n.t('game.letter-guessed', { letter: text }),
        getLetterViewerKeyboard(this.wordSkelet).createLetterViewerKeyboard
      )
      if (!this.wordSkelet.includes('-')) {
        this.gameWon()
      }
    } else {
      this.attempts--

      await ctx.replyWithPhoto({
        source: this.getAssociatedImgPath()
      })

      if (this.attempts) {
        await ctx.reply(
          ctx.i18n.t('game.letter-not-guessed'),
          getLetterViewerKeyboard(this.wordSkelet).createLetterViewerKeyboard
        )
      } else {
        this.gameOver()
      }
    }
  }

  async gameWon() {
    const ctx = this.ctx
    const { mainKeyboard } = getMainKeyboard(ctx)
    this.isGameWon = true
    this.isGameProcess = false
    await ctx.reply(ctx.i18n.t('game.game-win'))
    await ctx.reply(ctx.i18n.t('keyboards.back-keyboard.end-game'), mainKeyboard)
  }

  async gameOver() {
    const ctx = this.ctx
    this.isGameWon = false
    this.isGameProcess = false
    await ctx.replyWithPhoto({
      source: path.join(__dirname, `../images/game-over.png`)
    })
    await ctx.reply(ctx.i18n.t('game.game-over'), getLetterViewerKeyboard(this.word).createLetterViewerKeyboard)
  }

  initWord(word: string) {
    this.word = word
    this.wordSkelet = this.word.replace(/./g, '-')
  }

  getAssociatedImgPath() {
    let imgPath
    if (this.attempts === 7) {
      imgPath = path.join(__dirname, '../images/empty.png')
    } else {
      imgPath = path.join(__dirname, `../images/hangman-${6 - this.attempts}.png`)
    }
    return imgPath
  }

  getRandomWord(topic: string) {
    const wordsCollection = WORDS[topic]
    const collectionLength = wordsCollection.length
    let randomNum = Math.floor(Math.random() * collectionLength)
    let randomWord = wordsCollection[randomNum]
    return randomWord
  }

  matchWordWithLetter(letter: string) {
    this.wordSkelet = this.word
      .toLowerCase()
      .split('')
      .map((value, id) => (value === letter ? value : this.wordSkelet[id]))
      .join('')
  }

  isLetterInWord(letter: string) {
    letter = letter.toLowerCase()
    this.letters.push(letter)
    return this.word.toLowerCase().includes(letter)
  }
}
