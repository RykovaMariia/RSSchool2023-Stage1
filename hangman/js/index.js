import { words } from "./Words.js";
import { HangmanGame } from "./HangmanGame.js";

window.onload = function () {
  playGame();

};

function playGame() {
  const game = new HangmanGame(words[randomWord()]);
  game.showGame();
  isWin(game);
}

function isWin(game) {
  document.querySelector(".keyboard").addEventListener("click", e => {
    if (e.target.classList.contains("keyboard__button")) {
      const isWinOrLoose = localStorage.getItem("isWin");
      if(isWinOrLoose === 'false') {
        setTimeout(() =>{
          alert("loose")
          localStorage.setItem("isWin", '')
        }, 500)
        
      } else if (isWinOrLoose === 'true') {

        alert("win");

        localStorage.setItem("isWin", '')
      }
      ;
    }
  })
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