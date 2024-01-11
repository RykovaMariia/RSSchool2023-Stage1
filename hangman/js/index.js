import { words } from "./Words.js";
import { HangmanGame } from "./HangmanGame.js";


window.onload = function () {
  playGame();

};

function playGame() {
  const game = new HangmanGame(words[randomWord()]);
  game.showGame()

  
}

function randomWord() {
  let currentNumber = localStorage.getItem('currentNumber') || 0;
  if (currentNumber >= words.length - 1) {
    currentNumber = 0;
  } else {
    currentNumber++;
  }

  localStorage.setItem('currentNumber', currentNumber);

  console.log(currentNumber);
  return currentNumber;
}