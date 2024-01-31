import { CreatorElement } from "../../../utils/CreatorElement.js";
import { BaseView } from "../../BaseView.js";

export class ScoreView extends BaseView {
  constructor() {
    super("section", ["score"]);
    this.append();
  }

  append() {
    const wrapper = new CreatorElement("div", ["score__wrapper"],);
    this.viewElement.appendElement(wrapper.getElement());

    const close = new CreatorElement("span", ["material-symbols-outlined"], "close", () => this.cbClose());
    wrapper.appendElement(close.getElement());

    const h2 = new CreatorElement("h2", [], "The high score table");
    wrapper.appendElement(h2.getElement());

    const list = new CreatorElement("div", ['score__list']);
    wrapper.appendElement(list.getElement());

    const ol = new CreatorElement("ol");
    list.appendElement(ol.getElement());

    for (let i = 0; i < 5; i++) {
      const li = new CreatorElement("li");
      if (i === 0) {
        li.setClassName(["score__first"]);
      }
      ol.appendElement(li.getElement());
    }
  }

  cbClose() {
    this.viewElement.getElement().classList.remove('score_opened');
  }
}
