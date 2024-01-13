import { words } from "./Words.js";
import { HangmanGame } from "./HangmanGame.js";
import { Modal } from "./Modal.js";

window.onload = function () {

  console.warn('♡ Dear reviewer ♡ \n\n please use the English keyboard layout\n ');

  playGame();

};

function playGame() {
  let word = words[randomWord()];
  const game = new HangmanGame(word);
  game.showGame();
  isWin(word);
}

function isWin(word) {
  document.querySelector(".keyboard").addEventListener("click", e => {
    if (e.target.classList.contains("keyboard__button")) {
      const isWinOrLoose = localStorage.getItem("isWin");

      if(isWinOrLoose === 'false') {

        const modal = new Modal(word, false);
        modal.showModal()
        localStorage.setItem("isWin", '')
        
      } else if (isWinOrLoose === 'true') {
        const modal = new Modal(word, true);
        modal.showModal()
        localStorage.setItem("isWin", '')
      }
      ;
    }
  })

  document.addEventListener("keyup", (e) => { 
      const isWinOrLoose = localStorage.getItem("isWin");
      if(isWinOrLoose === 'false') {
        const modal = new Modal(word, false);
        modal.showModal()
        localStorage.setItem("isWin", '')
        
      } else if (isWinOrLoose === 'true') {

        const modal = new Modal(word, true);
        modal.showModal()
        localStorage.setItem("isWin", '')
      ;
    }
  })
}

function randomWord() {
  let currentNumber = Math.floor(Math.random() * ((words.length - 1) - 0) + 0);
  let localNumber = localStorage.getItem('currentNumber') || 0;
  if (currentNumber === localNumber) {
    currentNumber = randomWord();
  } else {
    localStorage.setItem('currentNumber', currentNumber);
    return currentNumber;
  }
}