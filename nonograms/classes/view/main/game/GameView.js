import { CreatorElement } from "../../../utils/CreatorElement.js";
import { BaseView } from "../../BaseView.js";

export class GameView extends BaseView {
  /**
   *
   * @param {number} level
   */
  constructor(level) {
    super("section", ["game"]);
    this.appendInnerGame(level);
  }

  appendInnerGame(level) {
    this.appendHeading();
    this.appendTime();
    this.appendField(level);
  }

  appendHeading() {
    const h1 = new CreatorElement("h1", [], "Nonograms");
    this.viewElement.appendElement(h1.getElement());
  }

  appendTime() {
    const timeDiv = new CreatorElement("div", ["game__time"], "00:00");
    this.viewElement.appendElement(timeDiv.getElement());
  }

  appendField(level) {
    const table = new CreatorElement("table", ["nonograms"]);
    this.viewElement.appendElement(table.getElement());

    const tbody = new CreatorElement("tbody");
    table.appendElement(tbody.getElement());

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
        const td = new CreatorElement("td");

        if (i === 0) {
          td.setClassName(["nonograms__top"]);
        }
        if (j === 0 && i === 0) {
          td.setClassName(["nonograms__top_none"]);
        }
        if (j === 0 && i !== 0) {
          td.setClassName(["nonograms__left"]);
        }
        if (i > 0 && j > 0) {
          td.setClassName(["cell"]);
        }
        if (j % 5 === 1 && i > 0) {
          td.setClassName(["cell_first"]);
        }
        if (j % 5 === 0 && i !== 0) {
          td.setClassName(["cell_five"]);
        }

        tr.appendElement(td.getElement());
      }
    }
  }
}
