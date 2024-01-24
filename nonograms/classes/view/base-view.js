export class BaseView {
  /**
   * @param {string} tag
   * @param {Array<string>} classNames
   * @param {string} text
   * @param {function} cb
   */
  constructor(tag, classNames = [], text, cb) {
    this.tag = tag;
    this.classNames = classNames;
    this.text = text;
    this.cb = cb;

    this.element = null;
    this.createElement()
  }

  /**
   *
   * @returns ViewElement
   */
  getElement() {
    return this.element;
  }

  createElement() {
    this.element = document.createElement(this.tag);

    if (this.classNames.length > 0) {
      this.element.className = this.classNames.join(" ");
    }
    if (this.text) {
      this.element.innerText = this.text;
    }
    if (typeof cb === "function") {
      this.element.addEventListener("click", (e) => this.cb(e));
    }
  }
}
