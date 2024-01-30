import { CreatorElement } from "../../utils/CreatorElement.js";
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

    this.appendMenuButton(game, menu.getHTMLElement());
    this.appendScoreButton(game, score.getHTMLElement());
  }

  appendMenuButton(game, menuEl) {
    const menu = new CreatorElement("button", ["button","button_menu"], "", () =>
      this.cbMenu(menuEl)
    );
    game.viewElement.appendElement(menu.getElement());
  }

  cbMenu(menuEl) {
    menuEl.classList.toggle("menu_opened");
  }

  appendScoreButton(game, scoreEl) {
    const button = new CreatorElement(
      "button",
      ["button", "button_score"],
      "",
      () => this.cbScoreButton(scoreEl)
    );
    game.viewElement.appendElement(button.getElement());
  }

  cbScoreButton(scoreEl) {
    scoreEl.classList.toggle("score_opened");
  }
}
