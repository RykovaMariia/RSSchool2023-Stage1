import { BaseView } from "../BaseView.js";
import { GameView } from "./game/GameView.js";
import { MenuView } from "./menu/MenuView.js";
import { ScoreView } from "./score/ScoreView.js";

const START_NAME_INDEX = 0;

export class MainView extends BaseView {
  constructor() {
    super("main");
    this.appendMain();
  }

  appendMain() {
    const game = new GameView(START_NAME_INDEX);
    this.viewElement.appendElement(game.getHTMLElement());

    const menu = new MenuView(START_NAME_INDEX, game);
    this.viewElement.appendElement(menu.getHTMLElement());

    const score = new ScoreView();
    this.viewElement.appendElement(score.getHTMLElement());
  }
}
