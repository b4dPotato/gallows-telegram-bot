import { WORDS } from '@constants/index'

export function getRandomWord(topic: string) {
  const wordsCollection = WORDS[topic]
  const collectionLength = wordsCollection.length
  let randomNum = Math.floor(Math.random() * collectionLength)
  let randomWord = wordsCollection[randomNum]
  return randomWord
}
