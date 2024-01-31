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

    this.appendBurger(game, menu.getHTMLElement());
    this.appendScoreButton(game, score.getHTMLElement());
  }

  appendBurger(game, menuEl) {
    const burger = new CreatorElement("div", [,"burger"], "", () =>
      this.cbBurger(menuEl, burger.getElement())
    );

    for(let i = 0; i < 3; i++) {
      const burgerLine = new CreatorElement("div", ["burger__line"]);
      burger.appendElement(burgerLine.getElement());

    }

    game.viewElement.appendElement(burger.getElement());
  }

  cbBurger(menuEl, burgerEl) {
    menuEl.classList.toggle("menu_opened");
    burgerEl.classList.toggle('burger_opened')
  }

  appendScoreButton(game, scoreEl) {
    const button = new CreatorElement(
      "button",
      ["button", "button_score"],
      "Score",
      () => this.cbScoreButton(scoreEl)
    );
    game.viewElement.appendElement(button.getElement());

  }

  cbScoreButton(scoreEl) {
    scoreEl.classList.toggle("score_opened");
  }
}
