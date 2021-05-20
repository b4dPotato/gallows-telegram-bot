// NEED REFACTOR
import Game from './game'
// Replace from services to Models.
export default class User {
  id: number
  game: Game

  constructor(game: Game, id: number) {
    this.id = id
    this.game = game
  }
}
