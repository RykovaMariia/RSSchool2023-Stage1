import { CreatorElement } from "../../../utils/CreatorElement.js";
import { BaseView } from "../../BaseView.js";

export class ScoreView extends BaseView {
  constructor() {
    super("section", ["score"]);
    this.appendHeading();
    this.appendList();
  }

  appendHeading() {
    const h2 = new CreatorElement("h2", [], "The high score table");
    this.viewElement.appendElement(h2.getElement());
  }

  appendList() {
    const ol = new CreatorElement("ol");
    this.viewElement.appendElement(ol.getElement());

    for (let i = 0; i < 5; i++) {
      const li = new CreatorElement("li");
      if (i === 0) {
        li.setClassName(["score__first"]);
      }
      ol.appendElement(li.getElement());
    }
  }
}
