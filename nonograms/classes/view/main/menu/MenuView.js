import { CreatorElement } from "../../../utils/CreatorElement.js";
import { BaseView } from "../../BaseView.js";
import { LevelView } from "./LevelView.js";
import { NameView } from "./NameView.js";

const START_LEVEL_INDEX = 0;
const START_NAME_INDEX = 0;

export class MenuView extends BaseView {
  constructor() {
    super("section", ["menu"]);
    this.appendInnerMenu();
  }
  namesGame = new NameView(START_LEVEL_INDEX, START_NAME_INDEX);

  appendInnerMenu() {
    this.appendHeading();
    this.appendLevels();
    this.appendNamesGame();
  }

  appendHeading() {
    const h2 = new CreatorElement("h2", [], "Menu");
    this.viewElement.appendElement(h2.getElement());
  }

  appendLevels() {
    const levels = new LevelView(START_LEVEL_INDEX, this.namesGame);
    this.viewElement.appendElement(levels.getHTMLElement());
  }

  appendNamesGame() {
    this.viewElement.appendElement(this.namesGame.getHTMLElement());
  }
}
