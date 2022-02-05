import { Menu } from "./menu.js";
import { World } from "./world.js";
import { find, show, hide } from "./utilities.js";

const body = document.body;

const gameCanvas = find("game");
const menu = find("menu");

export const Game = {
  init() {
    // hide everything so we can build it
    hide(gameCanvas);
    hide(menu);

    // make the background dark gray
    body.style.backgroundColor = "#333333";

    // create the menu
    Menu.onStart(() => this.start());
    Menu.createMenu();
    Menu.showMenu();
  },
  start() {
    Menu.hideMenu();
    this.createWorld().then(() => show(gameCanvas));
  },
  async createWorld() {
    // clear the contents of game
    gameCanvas.innerHTML = "";

    // style the game canvas
    gameCanvas.style.width = "600px";
    gameCanvas.style.height = "600px";
    gameCanvas.style.boxShadow = "10px 10px 30px black";
    // gameCanvas.style.backgroundImage = "url('/game/backgrounds/bg_game.jpg')";
    gameCanvas.style.backgroundColor = "#314432";
    gameCanvas.style.backgroundSize = "cover";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.top = "50%";
    gameCanvas.style.left = "50%";
    gameCanvas.style.transform = "translate(-50%, -50%)";
    gameCanvas.style.borderRadius = "50px";
    gameCanvas.style.overflow = "hidden";

    // load the world
    await World.init();
    gameCanvas.innerHTML = World.mapText;
  },
};
