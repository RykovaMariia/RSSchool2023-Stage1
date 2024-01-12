import { alphabet } from "./alphabet.js";

export class HangmanGame {
  constructor({ word, hint, incorrectGuesses = 0 }) {
    this.word = word;
    this.hint = hint;
    this.incorrectGuesses = incorrectGuesses;
  }

  generateHeader() {
    let header = document.createElement("header");
    let heading = document.createElement("h1");
    heading.innerText = "Hangman Game";

    header.appendChild(heading);
    return header;
  }

  hideWord() {
    console.log(this.word);
    return this.word.replace(/[a-zA-Z]/g, "_");
  }

  generateMain() {
    let main = document.createElement("main");
    main.className = "game";

    let sectionPicture = document.createElement("section");
    sectionPicture.className = "picture";
    let template = "";

    template += `<svg class="picture__img" x="0" y="0" version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="1080.000000pt"
    viewBox="0 0 1080.000000 1080.000000"
    preserveAspectRatio="xMidYMid meet"
    >
    <g
    transform="translate(0.000000,1080.000000) scale(0.100000,-0.100000)"
              >
                <path
                  class="picture__gallows"
                  d="M7247 8416 c-21 -8 -77 -36 -125 -64 -126 -72 -133 -75 -334 -151
    -540 -204 -1057 -336 -1788 -456 -273 -45 -371 -59 -945 -135 -659 -88 -766
    -103 -1173 -166 -232 -35 -561 -87 -730 -114 -169 -28 -312 -50 -318 -50 -14
    0 -46 122 -84 317 -46 239 -77 323 -130 350 -57 29 -194 1 -283 -58 -84 -56
    -84 -122 3 -320 86 -196 137 -335 127 -346 -12 -11 -730 -93 -823 -93 -40 0
    -42 -1 -48 -37 -10 -64 -7 -233 6 -276 8 -26 23 -47 42 -59 48 -30 197 -20
    421 31 194 43 317 66 407 76 l56 6 21 -88 c32 -140 68 -355 87 -528 l17 -160
    -71 -150 c-39 -82 -72 -156 -74 -164 -2 -8 28 -33 77 -62 44 -27 85 -52 92
    -56 26 -17 34 -510 40 -2304 l6 -1806 -394 -7 c-273 -5 -396 -11 -400 -18 -14
    -23 -33 -144 -33 -209 0 -81 17 -123 59 -149 32 -20 49 -20 716 -20 376 0 731
    4 789 10 232 22 390 30 710 40 376 11 565 21 950 50 146 11 429 31 630 45 201
    14 426 30 500 35 404 29 1660 64 2675 75 559 6 1104 25 1470 52 121 8 405 18
    630 22 388 6 412 7 449 27 66 34 80 62 84 164 5 106 -14 173 -59 216 -30 29
    -31 29 -152 28 -95 -1 -156 -8 -273 -32 -204 -42 -267 -49 -649 -72 -466 -28
    -771 -38 -1480 -50 -1438 -23 -2294 -48 -2740 -80 -77 -6 -246 -17 -375 -25
    -129 -9 -320 -22 -425 -30 -809 -62 -909 -67 -1602 -72 l-673 -5 0 808 c0 612
    -4 856 -15 1004 -19 250 -32 675 -45 1420 -9 520 -24 912 -46 1170 l-6 75 149
    240 c208 335 261 429 405 717 16 31 36 59 46 62 9 3 179 30 377 60 349 53 572
    84 1295 181 752 101 1214 181 1650 286 91 22 173 42 183 45 16 5 17 -12 17
    -261 0 -242 2 -269 19 -303 41 -81 133 -81 195 1 40 52 83 154 110 260 24 93
    66 344 66 397 0 23 11 29 173 83 94 32 235 83 312 113 77 30 182 66 234 80 52
    14 112 32 133 41 51 20 88 66 88 108 0 45 -32 144 -63 197 -49 84 -94 108
    -160 84z m-5087 -1451 c0 -24 -198 -371 -206 -362 -4 3 -57 254 -67 312 -1 5
    50 19 113 31 122 23 160 27 160 19z"
                />
                <path
                  class="picture__head"
                  d="M6334 6730 c-109 -12 -172 -28 -233 -60 -31 -16 -76 -34 -101 -40
    -133 -34 -261 -143 -328 -280 -67 -138 -115 -374 -115 -570 -1 -114 2 -133 30
    -212 65 -187 202 -352 354 -427 105 -51 202 -76 397 -101 277 -36 464 -24 599
    39 205 96 368 269 434 458 97 279 43 725 -110 917 -77 97 -256 203 -411 245
    -135 37 -342 49 -516 31z"
                />
                <path
                  class="picture__body"
                  d="M6544 4695 c-25 -38 -37 -477 -27 -970 4 -220 7 -431 5 -470 -4 -103
    6 -173 30 -197 16 -16 28 -19 62 -14 61 10 86 30 86 69 0 18 -4 37 -9 42 -8
    10 -24 507 -37 1203 -7 363 -7 362 -64 362 -20 0 -35 -8 -46 -25z"
                />
                <path
                  class="picture__right-hand"
                  d="M7117 4572 c-32 -35 -21 -64 50 -132 89 -87 209 -250 285 -388 102
    -184 167 -279 200 -293 56 -23 110 29 88 86 -32 84 -226 377 -373 563 -65 82
    -180 182 -211 182 -12 0 -30 -8 -39 -18z"
                />
                <path
                  class="picture__left-hand"
                  d="M6046 4559 c-99 -53 -274 -201 -459 -386 -140 -142 -163 -176 -145
    -223 11 -31 25 -40 62 -40 24 0 62 33 235 203 113 112 252 240 309 286 56 46
    102 87 102 92 0 4 3 14 6 23 6 17 -37 66 -58 66 -7 0 -31 -9 -52 -21z"
                />
                <path
                  class="picture__left-leg"
                  d="M6078 2803 c-76 -80 -459 -618 -507 -710 -26 -52 -26 -64 0 -97 23
    -29 54 -33 86 -11 12 8 91 120 176 248 84 127 201 299 260 381 59 82 107 159
    107 171 0 12 -8 29 -18 38 -30 28 -64 21 -104 -20z"
                />
                <path
                  class="picture__right-leg"
                  d="M7147 2722 c-41 -45 -3 -118 169 -327 63 -77 165 -213 226 -303 61
    -90 119 -167 129 -173 48 -25 99 3 99 57 0 46 -46 112 -285 409 -66 83 -149
    191 -184 240 -35 50 -71 96 -79 103 -23 17 -56 15 -75 -6z"
                />
    </g></svg>`;

    sectionPicture.innerHTML = template;

    let sectionGameplay = document.createElement("section");
    sectionGameplay.className = "gameplay";

    let divWord = document.createElement("div");
    divWord.className = "gameplay__word";
    divWord.innerText = `${this.hideWord()}`;

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

    alphabet.forEach((el) => {
      let divKey = document.createElement("button");
      divKey.className = "keyboard__button";
      divKey.innerText = `${el}`;

      divKeyboard.append(divKey);
    });

    sectionGameplay.append(divWord);
    sectionGameplay.append(divHint);
    sectionGameplay.append(divGuesses);
    sectionGameplay.append(divKeyboard);

    main.append(sectionPicture);
    main.append(sectionGameplay);
    return main;
  }

  showGame() {
    document.body.prepend(this.generateMain());
    document.body.prepend(this.generateHeader());

    this.buttonsClickHandler();
    this.buttonsKeyboardHandler();
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
          this.drawHangman();
          this.hideButton(e.target);
        }
      }
    });
  }

  buttonsKeyboardHandler() {
    document.addEventListener('keyup', (e) => {
      let indexLetter = alphabet.indexOf(e.key);
      const el = document.querySelector(`.keyboard__button:nth-child(${indexLetter + 1})`);
      console.log(el);

      if (indexLetter >= 0) {
        let letter = e.key;
        const indexes = this.searchIndexes(letter);

        if (indexes.length > 0) {
          this.hideButton(el);
          this.unhideLetter(indexes, letter);
        } else {
          this.addIncorrectGuesses();
          this.drawHangman();
          this.hideButton(el);
        }
      }
    })
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
    const displayWord = wordEl.innerText.split("");

    indexes.forEach((i) => (displayWord[i] = letter));

    wordEl.innerText = displayWord.join("");
  }

  addIncorrectGuesses() {
    this.incorrectGuesses++;
    document.querySelector(".incorrect-guesses__count").innerText =
      this.incorrectGuesses;
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
          break;
      }
    }
  }
}
