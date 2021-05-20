import { Topics } from 'types/topics'
import { Words } from 'types/words'

export const TOPICS: Topics = {
  animals: 'Животные',
  machines: 'Машинотехника',
  food: 'Еда'
}

/*
  Max length of word, should not greather than 8 symbols, 
  because telegram inline keyboard does not view more than 8 buttons in row.
*/
export const WORDS: Words = {
  animals: [
    'Броненосец',
    'Альпака',
    'Ополовник',
    'Вомбат',
    'Фенек',
    'Сурикат',
    'Квокка',
    'Ленивец',
    'Коала',
    'Калан',
    'Кошка',
    'Собака',
    'Капибара',
    'Гепард'
  ]
}
