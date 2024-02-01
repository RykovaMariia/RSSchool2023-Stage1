import { CreatorElement } from "../../../utils/CreatorElement.js";
import { BaseViewWithHandler } from "../../BaseViewWithHandler.js";
import { games } from "../../../../data/games.js";

export class ScoreView extends BaseViewWithHandler {
  constructor() {
    super("section", ["score"], (e) => this.cbClose(e));
    this.append();
    this.appendTextInList();
  }

  listElements = [];

  cbClose(e) {
    if (e.target.classList.contains("score")) {
      this.cbCloseButton();
    }
  }

  append() {
    const wrapper = new CreatorElement("div", ["score__wrapper"]);
    this.viewElement.appendElement(wrapper.getElement());

    const close = new CreatorElement(
      "span",
      ["material-symbols-outlined"],
      "close",
      () => this.cbCloseButton()
    );
    wrapper.appendElement(close.getElement());

    const h2 = new CreatorElement("h2", [], "The high score table");
    wrapper.appendElement(h2.getElement());

    const list = new CreatorElement("div", ["score__list"]);
    wrapper.appendElement(list.getElement());

    const ol = new CreatorElement("ol");
    list.appendElement(ol.getElement());

    for (let i = 0; i < 5; i++) {
      const li = new CreatorElement("li");
      this.listElements.push(li);
      if (i === 0) {
        li.setClassName(["score__first"]);
      }
      ol.appendElement(li.getElement());
    }
  }

  cbCloseButton() {
    this.viewElement.getElement().classList.remove("score_opened");
    document.body.classList.remove("lock");
  }

  appendTextInList() {
    let dataScore = [];
    dataScore = JSON.parse(localStorage.getItem("score"));
    if(dataScore && dataScore.length > 0) {
      let sortData = [];
      sortData = dataScore.sort((a, b) => a.time - b.time);

      sortData.forEach((el, i) => {
        const levels = ["easy", "medium", "hard"];
        const name = games[el.index].name;
        const level = levels[games[el.index].level];
        const min = Math.trunc(el.time / 60).toString().padStart(2, "0");
        const sec = (el.time % 60).toString().padStart(2, "0");
        this.listElements[i].setTextContent(`${name}, ${level} ${min}:${sec}`);
      });
    }
    
  }
}
