import { MainView } from "./view/main/main-view.js";

export class App {
  constructor() {
    this.createView();
    console.log(',kby');
  }

  createView() {
    const main = new MainView();

    document.body.prepend(main.getElement());
}
}