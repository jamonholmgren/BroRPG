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

    Menu.onStart(() => this.start());

    Menu.createMenu();
    Menu.showMenu();
  },
  start() {
    hide(menu);
    show(gameCanvas);
  },
};
