import { CreatorElement } from "../../utils/CreatorElement.js";
import { BaseView } from "../BaseView.js";

export class ModalView extends BaseView {
  /**
   *
   * @param {number} gameIndex
   */
  constructor() {
    super("div", ["modal"]);
    this.appendInnerModal();
  }

  appendInnerModal() {
    const window = new CreatorElement("div", ["modal__window"]);
    this.viewElement.appendElement(window.getElement());

    const text = new CreatorElement(
      "div",
      ["result-game"],
      "Great!\nYou have solved the nonogram!"
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
  }
}
