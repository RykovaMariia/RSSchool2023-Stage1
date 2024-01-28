import { BaseView } from "../BaseView.js";
import { GameView } from "./game/GameView.js";
import { MenuView } from "./menu/MenuView.js";
import { ScoreView } from "./score/ScoreView.js";

export class MainView extends BaseView {
  constructor() {
    super("main");
    this.appendMain();
  }

  /**
   * {number} level
   * {string} game
   */


  appendMain() {
    const game = new GameView(0);
    this.viewElement.appendElement(game.getHTMLElement());

    const menu = new MenuView();
    this.viewElement.appendElement(menu.getHTMLElement());

    const score = new ScoreView();
    this.viewElement.appendElement(score.getHTMLElement());
  }
}
