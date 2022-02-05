import { show, find } from "./utilities.js";

const menu = find("menu");

export const Menu = {
  createMenu() {
    // clear the contents of menu
    menu.innerHTML = "";

    // make the menu 600x600
    menu.style.width = "600px";
    menu.style.height = "600px";

    // give the menu a drop shadow
    menu.style.boxShadow = "10px 10px 30px black";

    // set the menu background image to bg_menu.jpg
    menu.style.backgroundImage = "url('/game/backgrounds/bg_menu.jpg')";

    // stretch the menu background image to fill the entire screen
    menu.style.backgroundSize = "cover";

    // set the menu to be centered
    menu.style.position = "absolute";
    menu.style.top = "50%";
    menu.style.left = "50%";
    menu.style.transform = "translate(-50%, -50%)";

    // create a clickable area in the middle for the start button
    const startButton = document.createElement("div");
    startButton.id = "start-button";
    startButton.style.width = "200px";
    startButton.style.height = "200px";
    startButton.style.backgroundColor = "transparent";
    startButton.style.border = "none";
    startButton.style.position = "absolute";
    startButton.style.top = "50%";
    startButton.style.left = "50%";
    startButton.style.transform = "translate(-50%, -50%)";
    startButton.style.cursor = "pointer";
    startButton.style.zIndex = "1";
    menu.appendChild(startButton);

    // trigger the start button when clicked
    startButton.addEventListener("click", () => this.hideMenu());
  },
  showMenu() {
    show(menu);
  },
  hideMenu() {
    hide(menu);
  },
};
