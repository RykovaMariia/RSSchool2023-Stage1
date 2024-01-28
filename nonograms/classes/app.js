import { MainView } from "./view/main/MainView.js";
import { ModalView } from "./view/modal/ModalView.js";

export class App {
  constructor() {
    this.createView();
  }

  createView() {
    const main = new MainView();
    

    document.body.prepend(main.getHTMLElement());
}


}