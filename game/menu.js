import { show, find } from "./utilities.js";

const menu = find("menu");

export const Menu = {
  createMenu() {
    // clear the contents of menu
    menu.innerHTML = "";

    // style the menu
    menu.style.width = "600px";
    menu.style.height = "600px";
    menu.style.boxShadow = "10px 10px 30px black";
    menu.style.backgroundImage = "url('/game/backgrounds/bg_menu.jpg')";
    menu.style.backgroundSize = "cover";
    menu.style.position = "absolute";
    menu.style.top = "50%";
    menu.style.left = "50%";
    menu.style.transform = "translate(-50%, -50%)";

    // create a clickable area in the middle for the start button
    const startButton = document.createElement("div");
    startButton.id = "start-button";

    // style the start button
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

    // trigger the start button when clicked
    startButton.addEventListener("click", () => this.hideMenu());

    // add it to the menu
    menu.appendChild(startButton);
  },
  showMenu() {
    show(menu);
  },
  hideMenu() {
    hide(menu);
  },
};
