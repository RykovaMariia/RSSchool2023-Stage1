import { alphabetEng } from "./alphabetLetter.js";
import { alphabetRu } from "./alphabetLetter.js";
import { Modal } from "./Modal.js";

export class HangmanGame {
  constructor({ word, hint, incorrectGuesses = 0 }) {
    this.word = word;
    this.hint = hint;
    this.incorrectGuesses = incorrectGuesses;
    this.displayWord = this.hideWord();
  }

  clickedKey = [];

  main = document.createElement("main");
  header = document.createElement("header");
  alarm = document.createElement("div");

  generateHeader() {
    let heading = document.createElement("h1");
    heading.innerText = "Hangman Game";

    this.header.appendChild(heading);
    return this.header;
  }

  hideWord() {
    console.info(`answer: ${this.word.toUpperCase()}`);
    this.displayWord = this.word.replace(/[a-zA-Z]/g, "_");
    return this.displayWord;
  }

  generateMain() {
    
    this.main.className = "game";

    let sectionPicture = document.createElement("section");
    sectionPicture.className = "picture";
    let template = "";

    template += `<svg class="picture__img" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    viewBox="0 0 1080 1080">
 <g transform="translate(0.000000,1080.000000) scale(0.100000,-0.100000)">
   <path class="picture__gallows" d="M7237.9,10511.7c-22.2-11.6-81.3-52.2-131.9-92.7c-133-104.3-140.4-108.7-352.5-218.8
     c-569.9-295.6-1232.1-469.6-2003.5-643.4c-288.1-65.2-391.5-85.5-997.3-195.6c-695.4-127.5-808.4-149.2-1237.9-240.5
     c-244.8-50.7-495.1-91.8-673.5-130.9c-178.3-40.6-329.3-72.4-335.6-72.4c-14.8,0-101.6,290.8-141.7,573.3
     c-48.5,346.3-81.3,468-137.2,507.1c-60.2,42-204.7,1.4-298.6-84c-88.6-81.1-88.6-176.8,3.2-463.6c90.8-284,197.6-599.4,187.1-615.3
     C1105.8,8818.8,348.1,8700,250,8700c-42.2,0-44.3-1.4-50.7-53.6c-10.6-92.7-60.5-223.6-46.7-285.9c8.4-37.7,24.3-68.1,44.3-85.5
     c50.7-43.5,207.9-29,444.3,44.9c204.7,62.3,334.5,95.6,429.5,110.1l59.1,8.7l22.2-127.5c33.8-202.8,71.8-514.3,91.8-765l17.9-231.8
     l-74.9-217.3c-41.2-118.8-76-226-78.1-237.6s29.5-47.8,81.3-89.8c46.4-39.1,89.7-75.3,97.1-81.1c27.4-24.6,35.9-738.9,42.2-3338.1
     L1355.4,526l-415.8-10.1c-288.1-7.2-417.9-15.9-422.1-26.1c-14.8-33.3-54.7-0.8-54.7-94.9c0-117.4,17.9-178.2,62.3-215.9
     c33.8-29,51.7-29,755.6-29c396.8,0,771.4,5.8,832.6,14.5c244.8,31.9,411.6,43.5,749.3,58c396.8,15.9,596.2,30.4,1002.5,72.4
     c154.1,15.9,452.7,44.9,664.8,65.2c212.1,20.3,449.6,43.5,527.6,50.7c426.3,42,1751.8,92.7,2822.9,108.7
     c589.9,8.7,1165.1,36.2,1551.3,75.3c127.7,11.6,427.4,26.1,664.8,31.9c409.5,8.7,344.4,5.6,431.1,1.1
     c60,10.7,132.5,44.4,131.4,134.9c5.3,153.6-8.3,154.4-55.8,216.7c-31.7,42-32.7,42-160.4,40.6c-100.3-1.4-164.6-11.6-288.1-46.4
     c-215.3-60.9-281.8-71-684.9-104.3c-491.8-40.6-813.6-55.1-1561.8-72.4C6390.6,763.6,5500.7,756.4,5030,710
     c-81.3-8.7-259.6-24.6-395.7-36.2c-136.1-13-337.7-31.9-448.5-43.5C3332,540.5,3226.5,533.2,2495.2,526l-710.2-7.2l-19.8,1378.5
     c0,886.7-4.2,1240.2-15.8,1454.6c-20.1,362.2-33.8,978-47.5,2057.3c-9.5,753.4-25.3,1321.3-48.5,1695.1l-6.3,108.7l157.2,347.7
     c219.5,485.4,275.4,621.5,427.4,1038.8c16.9,44.9,38,85.5,48.5,89.8c9.5,4.3,188.9,43.5,397.8,86.9
     c368.3,76.8,603.6,121.7,1366.6,262.2c737.3,136,1184.2,230.2,1741.2,414.4c96,31.9,182.6,60.9,193.1,65.2
     c16.9,7.2,17.9-17.4,17.9-378.1c0-350.6,2.1-389.7,20.1-439c43.3-117.4,29.9-162,95.3-43.2c42.2,75.3-32.9,304.2-4.4,457.8
     c0,152.7-29.1,360,26.7,440c19.1,27.3,285.6,140.8,456.5,219c99.2,46.4,248,120.3,329.3,163.7c81.3,43.5,192.1,95.6,246.9,115.9
     c54.9,20.3,118.2,46.4,140.4,59.4c53.8,29,92.9,95.6,92.9,156.5c0,65.2,39,43.1,6.3,119.9
     C7355,10511.7,7307.5,10546.5,7237.9,10511.7z M1796.8,8575c0-34.8-208.9-537.5-217.4-524.5c-4.2,4.3-60.2,368-70.7,452
     c-1.1,7.2,52.8,27.5,119.2,44.9C1756.7,8580.8,1796.8,8586.6,1796.8,8575z"/>
   <path class="picture__head" d="M6675.5,8887.2c-94.7,7.3-151.5,2.1-210.2-20.3c-29.8-11.1-71.8-21.7-94.3-23.4c-119.9-11.3-252.6-102.1-340.2-233.3
     c-87.8-132.3-181.8-370.6-226.2-575.9c-26.7-119.2-28.5-139.6-22.7-227.5c12.5-207.7,90.6-405.5,201.9-511.8
     c77-72.6,153.2-116.5,312-178.2c225.5-88.3,386-109.9,514.2-68.5c194.7,63.1,371.4,214.5,469.9,400.3
     c145.1,274.4,200.6,751.3,115,980.3c-43,115.6-170,259.3-291.2,331.6C6998.3,8823.9,6826.4,8874.3,6675.5,8887.2z"/>
   <path class="picture__body" d="M6257.5,7231.2c-39.5-58.7-58.4-736.7-42.6-1498.2c6.3-339.8,11-665.7,7.9-725.9c-6.3-159.1,9.5-267.2,47.3-304.3
     c25.3-24.7,44.2-29.3,97.9-21.6c96.3,15.4,135.7,46.3,135.7,106.6c0,27.8-6.3,57.1-14.2,64.9c-12.6,15.4-37.9,783.1-58.4,1858.1
     c-11,560.7-11,559.1-101,559.1C6298.5,7269.8,6274.8,7257.5,6257.5,7231.2z"/>
   <path class="picture__right-hand" d="M6383.4,6908.1c-50.5-67.7-33.1-123.7,78.9-255.2c140.5-168.2,329.9-483.4,449.8-750.2c161-355.8,263.6-539.4,315.7-566.5
     c88.4-44.5,173.6,56.1,138.9,166.3C7316.2,5664.9,7010,6231.4,6778,6591c-102.6,158.5-284.1,351.9-333,351.9
     C6426,6942.9,6397.6,6927.4,6383.4,6908.1z"/>
   <path class="picture__left-hand" d="M6099.7,6902.3c-156.2-102.5-432.4-388.6-724.4-746.3c-221-274.5-257.3-340.3-228.8-431.2c17.4-59.9,39.5-77.3,97.9-77.3
     c37.9,0,97.9,63.8,370.9,392.5c178.3,216.5,397.7,464,487.7,553c88.4,88.9,161,168.2,161,177.9c0,7.7,4.7,27.1,9.5,44.5
     c9.5,32.9-58.4,127.6-91.5,127.6C6170.7,6942.9,6132.8,6925.5,6099.7,6902.3z"/>
   <path class="picture__left-leg" d="M6169.4,4808.7C6049.4,4654,5444.9,3613.8,5369.2,3436c-41-100.5-41-123.7,0-187.5c36.3-56.1,85.2-63.8,135.7-21.3
     c18.9,15.5,143.6,232,277.8,479.5c132.6,245.5,317.2,578.1,410.3,736.6c93.1,158.5,168.9,307.4,168.9,330.6s-12.6,56.1-28.4,73.5
     C6286.2,4901.5,6232.5,4888,6169.4,4808.7z"/>
   <path class="picture__right-leg" d="M6391.3,4892.3c-64.7-87-4.7-228.1,266.7-632.2c99.4-148.9,260.4-411.8,356.7-585.8c96.3-174,187.8-322.9,203.6-334.5
     c75.8-48.3,156.2,5.8,156.2,110.2c0,88.9-72.6,216.5-449.8,790.8c-104.2,160.5-235.2,369.3-290.4,464
     c-55.2,96.7-112.1,185.6-124.7,199.1C6473.3,4936.8,6421.3,4932.9,6391.3,4892.3z"/>
 </g>
 <path  d="M752,182.7"/>
 <path class="st0" d="M657.7,275.5c0,0,5.1,14.2,10.1,14.9c5,0.7-5.1-17.3-5.1-17.3s18.5-7.8,15.8-11.2s-18.3,6.9-18.3,6.9
   s-10.6-18.8-11.1-14c-0.5,4.7,4.5,15.4,4.5,15.4s-13.9,7.6-12.3,10.9C642.9,284.4,657.7,275.5,657.7,275.5z"/>
 <path class="st0" d="M722.9,288.1c0,0,6.1,13.5,10.2,14.1c4.1,0.6-6.1-16.2-6.1-16.2s15.1-8,12.8-10.8c-2.3-2.8-14.9,7.2-14.9,7.2
   s-10.2-17.3-10.6-13.3c-0.4,4,5.2,14.5,5.2,14.5s-15.2,7.1-13.8,9.9C707,296.4,722.9,288.1,722.9,288.1z"/>
 </svg>
 `;

    sectionPicture.innerHTML = template;

    let sectionGameplay = document.createElement("section");
    sectionGameplay.className = "gameplay";

    let divWord = document.createElement("div");
    divWord.className = "gameplay__word";
    divWord.innerText = `${this.displayWord}`;

    let divHint = document.createElement("div");
    divHint.className = "hint";
    divHint.innerText = `Hint: `;

    let spanHint = document.createElement("span");
    spanHint.className = "hint__text";
    spanHint.innerText = `${this.hint}`;

    divHint.append(spanHint);

    let divGuesses = document.createElement("div");
    divGuesses.className = "incorrect-guesses";
    divGuesses.innerText = `Incorrect guesses: `;

    let spanGuessesCount = document.createElement("span");
    spanGuessesCount.className = "incorrect-guesses__count";
    spanGuessesCount.innerText = `${this.incorrectGuesses}`;
    let spanGuesses = document.createElement("span");
    spanGuesses.innerText = `/6`;

    divGuesses.append(spanGuessesCount);
    divGuesses.append(spanGuesses);

    let divKeyboard = document.createElement("div");
    divKeyboard.className = "keyboard";

    alphabetEng.forEach((el) => {
      let divKey = document.createElement("button");
      divKey.className = "button keyboard__button";
      divKey.innerText = `${el}`;

      divKeyboard.append(divKey);
    });

    sectionGameplay.append(divWord);
    sectionGameplay.append(divHint);
    sectionGameplay.append(divGuesses);
    sectionGameplay.append(divKeyboard);

    this.main.append(sectionPicture);
    this.main.append(sectionGameplay);
    return this.main;
  }

  generateAlarm() {
   
    this.alarm.className = "alarm-window";

    let img = document.createElement("img");
    img.className = "modal-alarm";
    img.setAttribute("src", "./assets/alarm.gif");
    img.setAttribute("alt", "");

    let modal = document.createElement("div");
    modal.className = "alarm-lang";
    modal.innerText = "please change the language to English";

    this.alarm.append(img);
    this.alarm.append(modal);
    return this.alarm;
  }

  showGame() {
    document.body.prepend(this.generateMain());
    document.body.prepend(this.generateHeader());
    document.body.prepend(this.generateAlarm());

    this.buttonsClickHandler();
    this.buttonsKeyboardHandler();
    this.isWin()
  }

  deleteGame() {
   document.querySelector('main').remove();
   document.querySelector('header').remove();
   document.querySelector('.alarm-window').remove();

  }

  buttonsClickHandler() {
    document.querySelector(".keyboard").addEventListener("click", (e) => {
      if (e.target.classList.contains("keyboard__button")) {
        let letter = e.target.innerText;

        const indexes = this.searchIndexes(letter);

        if (indexes.length > 0) {
          this.hideButton(e.target);
          this.unhideLetter(indexes, letter);
        } else {
          this.addIncorrectGuesses();
          this.hideButton(e.target);
        }
        this.clickedKey.push(letter);
      }
    });
  }

  buttonsKeyboardHandler() {
    document.addEventListener("keyup", this);
    this.handleEvent = function (e) {
      let letter = e.key.toLowerCase();
      let indexEngLetter = alphabetEng.indexOf(letter);
      let indexRuLetter = alphabetRu.indexOf(letter);

      if (!this.clickedKey.includes(letter)) {
        const el = document.querySelector(
          `.keyboard__button:nth-child(${indexEngLetter + 1})`
        );

        if (indexEngLetter >= 0) {
          const indexes = this.searchIndexes(letter);

          if (indexes.length > 0) {
            this.hideButton(el);
            this.unhideLetter(indexes, letter);
          } else {
            this.addIncorrectGuesses();
            this.hideButton(el);
          }
          this.clickedKey.push(letter);
        }
        if (indexRuLetter >= 0) {
          const alarm = document.querySelector(".alarm-window");

          alarm.classList.add("alarm-window_open");

          setTimeout(() => {
            alarm.classList.remove("alarm-window_open");
          }, 4000);
        }
      }
    };
  }

  searchIndexes(letter) {
    let currentWord = this.word.split("");

    let index = [];
    currentWord.forEach((el, i) => {
      if (el === letter) {
        index.push(i);
      }
    });
    return index;
  }

  hideButton(el) {
    el.classList.add("keyboard__button_hide");
    el.disabled = true;
  }

  unhideLetter(indexes, letter) {
    const wordEl = document.querySelector(".gameplay__word");
    this.displayWord = this.displayWord.split("");

    indexes.forEach((i) => (this.displayWord[i] = letter));

    this.displayWord = this.displayWord.join("");
    wordEl.innerText = this.displayWord;

    if (!this.displayWord.includes("_")) {
      this.getIsWin(true);
    }
  }

  addIncorrectGuesses() {
    this.incorrectGuesses++;
    if (this.incorrectGuesses <= 6) {
      document.querySelector(".incorrect-guesses__count").innerText =
        this.incorrectGuesses;
      this.drawHangman();
    }

    if (this.incorrectGuesses >= 6) {
      this.getIsWin(false);
    }
  }

  drawHangman() {
    if (this.incorrectGuesses > 0) {
      switch (this.incorrectGuesses) {
        case 1:
          document
            .querySelector(".picture__head")
            .classList.add("picture__head_unhide");
          break;
        case 2:
          document
            .querySelector(".picture__body")
            .classList.add("picture__body_unhide");
          break;
        case 4:
          document
            .querySelector(".picture__right-hand")
            .classList.add("picture__right-hand_unhide");
          break;
        case 3:
          document
            .querySelector(".picture__left-hand")
            .classList.add("picture__left-hand_unhide");
          break;
        case 5:
          document
            .querySelector(".picture__left-leg")
            .classList.add("picture__left-leg_unhide");
          break;
        case 6:
          document
            .querySelector(".picture__right-leg")
            .classList.add("picture__right-leg_unhide");
          document
            .querySelectorAll(".st0")
            .forEach((el) => el.classList.add("st0_unhide"));
          break;
      }
    }
  }

  getIsWin(boolean) {
    const isWin = boolean;
    if (isWin || isWin === false) {
      document.removeEventListener("keyup", this);
      localStorage.setItem("isWin", isWin);
    }
  }

  isWin() {
    document.querySelector(".keyboard").addEventListener("click", e => {
      if (e.target.classList.contains("keyboard__button")) {
        const isWinOrLoose = localStorage.getItem("isWin");
  
        if(isWinOrLoose === 'false') {
  
          const modal = new Modal(this.word, false);
          modal.showModal()
          localStorage.setItem("isWin", '')
          
        } else if (isWinOrLoose === 'true') {
          const modal = new Modal(this.word, true);
          modal.showModal()
          localStorage.setItem("isWin", '')
        }
        ;
      }
    })
  
    document.addEventListener("keyup", (e) => { 
        const isWinOrLoose = localStorage.getItem("isWin");
        if(isWinOrLoose === 'false') {
          const modal = new Modal(this.word, false);
          modal.showModal()
          localStorage.setItem("isWin", '')
          
        } else if (isWinOrLoose === 'true') {
  
          const modal = new Modal(this.word, true);
          modal.showModal()
          localStorage.setItem("isWin", '')
        ;
      }
    })
  }
}
