import { BaseView } from "../../BaseView.js";
import { games } from "../../../../data/games.js";
import { CreatorElement } from "../../../utils/CreatorElement.js";

export class NameView extends BaseView {
  constructor(levelGame, indexGame, gameComponent) {
    super("ul", ["menu__name-game"]);
    this.indexGame = indexGame;
    this.gameComponent = gameComponent;
    this.appendName(levelGame);
  }

  nameElements = [];

  appendName(levelGame) {
    games.forEach((el, index) => {
      if (el.level === levelGame) {
        const liName = new CreatorElement("li", ["name-game"], el.name, (e) =>
          this.cbName(e)
        );
        if (index === this.indexGame) {
          liName.setClassName(['name-game_selected']);
        }
        this.viewElement.appendElement(liName.getElement());
        this.nameElements.push(liName.getElement());
      }
    });
  }

  cbName(e) {
    if (e.target.classList.contains("name-game")) {
      const nameGame = e.target.innerText;
      games.forEach((el, i) => {
       if (el.name === nameGame){
         this.indexGame = i;
       }
     })
  this.selectedName(this.indexGame);
  }
}

  selectedName(index) {
   
      this.nameElements.forEach((el) => {
        el.classList.remove("name-game_selected");
    })
    
    this.nameElements[index].classList.add("name-game_selected");
    console.log(this.nameElements[index]);
     
      this.gameComponent.removeField();
      this.gameComponent.appendField(index);
    }

  removeNames() {
    this.nameElements.forEach((el) => el.remove());
  }

}
