import { WORDS } from '@constants/index'

import path from 'path'

export default class Game {
  word: string
  wordSkelet: string
  letters: Array<string>
  attempts: number

  constructor() {
    this.word = ''
    this.wordSkelet = ''
    this.letters = []
    this.attempts = 7
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
      imgPath = path.join(__dirname, `../images/hangman-${7 - this.attempts}.png`)
    }
    return imgPath
  }

  getRandomWord(topic: string) {
    const wordsCollection = WORDS[topic]
    const collectionLength = wordsCollection.length
    let randomNum = Math.floor(Math.random() * collectionLength)
    let randomWord = wordsCollection[randomNum]
    this.initWord(randomWord)
    return randomWord
  }

  getWrongLetter() {
    let wrontLetters = this.letters.filter((letter: string) => !this.word.includes(letter))
    return wrontLetters
  }

  matchWordWithLetter(letter: string) {
    this.wordSkelet = this.word
      .split('')
      .map(value => (value === letter ? value : '-'))
      .join('')
  }

  isLetterInWord(letter: string) {
    this.letters.push(letter)
    return this.word.includes(letter)
  }
}
