import { BaseViewWithHandler } from "../BaseViewWithHandler.js";
import { CreatorElement } from "../../utils/CreatorElement.js";

export class ModalView extends BaseViewWithHandler {
  #window;

  /**
   * @param {number} time
   */
  constructor(time) {
    super("div", ["modal"], (e) => cbModal(e));
    this.appendInnerModal(time);
  }

  appendInnerModal(time) {
    this.appendWindow();
    this.appendContent(time);
    this.appendButtonOk();
  }

  cbModal(e) {
    if (e.target.classList.contains("modal")) {
      this.cbButton();
    }
  }

  appendWindow() {
    this.#window = new CreatorElement("div", ["modal__window"]);
    this.viewElement.appendElement(this.#window.getElement());
  }

  appendContent(time) {
    const content = new CreatorElement(
      "div",
      ["result-game"],
      `Great!\n You have solved the nonogram\nin ${time} seconds!`
    );
    this.#window.appendElement(content.getElement());
  }

  appendButtonOk() {
    const button = new CreatorElement(
      "button",
      ["button", "button_modal"],
      "OK",
      () => this.cbButton()
    );
    this.#window.appendElement(button.getElement());
  }

  cbButton() {
    this.viewElement.setClassName(["modal_none"]);
    document.body.classList.remove("lock");
  }
}
