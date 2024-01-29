import { CreatorElement } from "../../../utils/CreatorElement.js";
import { BaseView } from "../../BaseView.js";
import { games } from "../../../../data/games.js";
import { ModalView } from "../../modal/ModalView.js";

export class GameView extends BaseView {
  /**
   *
   * @param {number} gameIndex
   */
  constructor(gameIndex) {
    super("section", ["game"]);
    this.gameIndex = gameIndex;
    this.appendInnerGame();
  }
  table = new CreatorElement("table", ["nonograms"]);
  timeDiv = new CreatorElement("div", ["game__time"], "00:00");

  nonogramsCluesTop = [];
  nonogramsCluesLeft = [];

  interval;
  sec = 0;
  min = 0;

  cells = [];

  appendInnerGame() {
    this.appendHeading();
    this.appendTime();
    this.appendField(this.gameIndex);
    this.appendButtons();
    this.clickRightMouse();
  }

  appendHeading() {
    const h1 = new CreatorElement("h1", [], "Nonograms");
    this.viewElement.appendElement(h1.getElement());
  }

  appendTime() {
    this.viewElement.appendElement(this.timeDiv.getElement());
  }

  appendField(gameIndex) {
    this.resetTime();
    this.timeDiv.setTextContent("00:00");
    this.cells = [];
    this.gameIndex = gameIndex;
    const level = games[gameIndex].level;

    this.viewElement.appendElement(this.table.getElement());
    const tbody = new CreatorElement("tbody");
    this.table.appendElement(tbody.getElement());

    let cell = "cell";
    if (level === 1) cell = "cell-medium";
    if (level === 2) cell = "cell-small";

    const n = (level + 1) * 5 + 1;

    for (let i = 0; i < n; i++) {
      const tr = new CreatorElement("tr");
      tbody.appendElement(tr.getElement());

      if (i % 5 === 1) {
        tr.setClassName(["first"]);
      }

      if (i % 5 === 0 && i !== 0) {
        tr.setClassName(["five"]);
      }

      for (let j = 0; j < n; j++) {
        const td = new CreatorElement("td", [], "", (e) => this.cbClick(e));

        if (i === 0 && j > 0) {
          td.setClassName(["nonograms__top"]);
          this.nonogramsCluesTop.push(td);
        }
        if (j === 0 && i === 0) {
          td.setClassName(["nonograms__top_none"]);
        }
        if (j === 0 && i !== 0) {
          td.setClassName(["nonograms__left"]);
          this.nonogramsCluesLeft.push(td);
        }
        if (i > 0 && j > 0) {
          td.setClassName(["cell", cell]);
          this.cells.push(td.getElement());
        }
        if (j % 5 === 1) {
          td.setClassName(["cell_first"]);
        }
        if (j % 5 === 0) {
          td.setClassName(["cell_five"]);
        }

        tr.appendElement(td.getElement());
      }
    }
    this.createClues(gameIndex);
  }

  createClues(gameIndex) {
    const solution = games[gameIndex].game;
    const cluesLeft = [];
    const cluesTop = [];

    for (let i = 0; i < solution.length; i++) {
      const cluesLeftInner = [];
      let countLeft = 0;

      const cluesTopInner = [];
      let countTop = 0;

      for (let j = 0; j < solution.length; j++) {
        if (solution[i][j] === 1) {
          countLeft++;
          if (j === solution.length - 1 || solution[i][j + 1] === 0) {
            cluesLeftInner.push(countLeft);
            countLeft = 0;
          }
        }
        if (solution[j][i] === 1) {
          countTop++;
          if (j === solution.length - 1 || solution[j + 1][i] === 0) {
            cluesTopInner.push(countTop);
            countTop = 0;
          }
        }
      }
      cluesLeft.push(cluesLeftInner);
      cluesTop.push(cluesTopInner);
    }
    this.nonogramsCluesLeft.forEach((el, i) => {
      el.setTextContent(cluesLeft[i].join(" ") || "0");
    });
    this.nonogramsCluesTop.forEach((el, i) => {
      el.setTextContent(cluesTop[i].join("\n") || "0");
    });
  }

  cbClick(e) {
    if (e.target.classList.contains("cell")) {
      if (!this.timeDiv.getElement().classList.contains("time-go")) {
        this.timeDiv.setClassName(["time-go"]);
        this.interval = setInterval(() => this.updateTime(), 1000);
      }
      e.target.classList.remove("cell_cross");
      e.target.classList.toggle("cell_dark");

      const result = this.cells.map((el) => {
        if (el.classList.contains("cell_dark")) {
          el = 1;
        } else {
          el = 0;
        }
        return el;
      });

      const solution = games[this.gameIndex].game.flat(1);

      if (
        result.length === solution.length &&
        solution.every((el, i) => el === result[i])
      ) {
        const time = this.min * 60 + this.sec;
        const modal = new ModalView(time);
        document.body.prepend(modal.getHTMLElement());
        this.resetTime();
      }
    }
  }

  clickRightMouse() {
    this.table.getElement().addEventListener("contextmenu", (e) => {
      if (e.target.classList.contains("cell")) {
        if (!this.timeDiv.getElement().classList.contains("time-go")) {
          this.timeDiv.setClassName(["time-go"]);
          this.interval = setInterval(() => this.updateTime(), 1000);
        }
        e.preventDefault();
        e.target.classList.remove("cell_dark");
        e.target.classList.toggle("cell_cross");
      }
    });
  }

  removeField() {
    this.nonogramsCluesTop = [];
    this.nonogramsCluesLeft = [];
    this.table.getElement().innerHTML = "";
    this.table.getElement().remove();
  }

  appendButtons() {
    const buttonsDiv = new CreatorElement("div", ["game__buttons"]);
    this.viewElement.appendElement(buttonsDiv.getElement());

    const buttonSave = new CreatorElement(
      "button",
      ["button", "button_save-game"],
      "Save game"
    );
    buttonsDiv.appendElement(buttonSave.getElement());

    const buttonSolution = new CreatorElement(
      "button",
      ["button", "button_solution"],
      "Solution"
    );
    buttonsDiv.appendElement(buttonSolution.getElement());

    const buttonReset = new CreatorElement(
      "button",
      ["button", "button_reset-game"],
      "Reset game"
    );
    buttonsDiv.appendElement(buttonReset.getElement());
  }

  updateTime() {
    this.sec++;
    if (this.sec === 60) {
      this.min++;
      this.sec = 0;
    }

    this.timeDiv.setTextContent(
      `${this.min.toString().padStart(2, "0")}:${this.sec
        .toString()
        .padStart(2, "0")}`
    );
  }

  resetTime() {
    clearInterval(this.interval);
    this.min = 0;
    this.sec = 0;
    this.timeDiv.getElement().classList.remove("time-go");
  }
}
