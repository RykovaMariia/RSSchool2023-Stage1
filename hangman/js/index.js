import { words } from "./Words.js";
import { HangmanGame } from "./HangmanGame.js";

window.onload = function () {

  playGame();

};

function playGame() {
  const game = new HangmanGame(words[1]);
  game.showGame()
}
