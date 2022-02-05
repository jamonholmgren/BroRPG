import { Menu } from "./menu.js";
import { find, hide } from "./utilities.js";

const body = document.body;

const gameCanvas = find("game");
const menu = find("menu");

export const Game = {
  init() {
    hide(gameCanvas);
    hide(menu);

    body.style.backgroundColor = "gray";

    Menu.createMenu();
    Menu.showMenu();
    Menu.onStart(() => this.start());
  },
  start() {
    hide(menu);
    show(gameCanvas);
  },
};
