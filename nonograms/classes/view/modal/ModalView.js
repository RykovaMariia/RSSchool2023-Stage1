import { CreatorElement } from "../../utils/CreatorElement.js";
import { BaseView } from "../BaseView.js";

export class ModalView extends BaseView {
  /**
   *
   * @param {number} gameIndex
   */
  constructor(time) {
    super("div", ["modal"]);
    this.appendInnerModal(time);
  }

  appendInnerModal(time) {
    const window = new CreatorElement("div", ["modal__window"]);
    this.viewElement.appendElement(window.getElement());

    const text = new CreatorElement(
      "div",
      ["result-game"],
      `Great!\n You have solved the nonogram\nin ${time} seconds!`
    );
    window.appendElement(text.getElement());

    const button = new CreatorElement(
      "button",
      ["button", "button_modal"],
      "OK", () => this.cbButton()
    );
    window.appendElement(button.getElement());
  }

  cbButton() {
    this.viewElement.setClassName(['modal_none']);
    document.body.classList.remove('lock')
  }
}
