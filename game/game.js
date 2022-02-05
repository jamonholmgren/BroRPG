import { Menu } from "./menu.js";
import { find, hide } from "./utilities.js";

const body = document.body;

const gameCanvas = find("game");

export const Game = {
  init() {
    hide(gameCanvas);

    body.style.backgroundColor = "gray";

    Menu.createMenu();
    Menu.showMenu();
  },
};
