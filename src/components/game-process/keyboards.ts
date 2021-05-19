import { Markup } from 'telegraf'

export const getLetterViewerKeyboard = (word: String) => {
  const NO_ACTION = '__NO_ACTION__'

  const inlineKeyboard = [word.split('').map((letter: string) => Markup.callbackButton(letter, NO_ACTION))]
  const createLetterViewerKeyboard = Markup.inlineKeyboard(inlineKeyboard).resize().extra()

  return {
    createLetterViewerKeyboard
  }
}
