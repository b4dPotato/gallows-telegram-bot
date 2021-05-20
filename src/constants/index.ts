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
    'Собака',
    'Альпака',
    'Сова',
    'Вомбат',
    'Фенек',
    'Сурикат',
    'Квокка',
    'Лев',
    'Коала',
    'Слон',
    'Кошка',
    'Капибара',
    'Гепард',
    'Пума',
    'Рысь',
    'Панда',
    'Страус',
    'Голубь',
    'Жираф',
    'Дельфин',
    'Акула'
  ],
  machines: ['Богдан', 'Эдуард'],
  food: [
    'Бастурма',
    'Пюре',
    'Круассан',
    'Борщ',
    'Овсянка',
    'Ананас',
    'Яблоко',
    'Огурец',
    'Помидор',
    'Перец',
    'Вафля',
    'Гречка',
    'Тефтеля',
    'Котлета',
    'Отбивная',
    'Манго',
    'Банан',
    'Маракуйя',
    'Колбаса',
    'Сыр',
    'Рис'
  ]
}
