import { BaseView } from "../../BaseView.js";
import { games } from "../../../../data/games.js";
import { CreatorElement } from "../../../utils/CreatorElement.js";

export class NameView extends BaseView {
  constructor(levelGame, nameGame) {
    super("ul", ["menu__name-game"]);

    this.appendName(levelGame, nameGame);
  }

  nameElements = [];

  appendName(levelGame, nameGame) {
    games.forEach((el) => {
      if (el.level === levelGame) {
        const liName = new CreatorElement("li", ["name-game"], el.name, (e) =>
          this.selectedName(e)
        );
        if (el.name === nameGame) {
          liName.setClassName(['name-game_selected']);
        }
        this.viewElement.appendElement(liName.getElement());
        this.nameElements.push(liName.getElement());
      }
    });
  }

  selectedName(e) {
    if (e.target.classList.contains("name-game")) {
      this.nameElements.forEach((el) =>
        el.classList.remove("name-game_selected")
      );
      e.target.classList.add("name-game_selected");
      
      this.nameGame = e.target.innerHTML;
    }
  }

  removeNames() {
    this.nameElements.forEach((el) => el.remove());
  }

}
