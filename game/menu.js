import { show, hide, find, noop } from "./utilities.js";
import { Sound } from "./sound.js";
// import { Settings } from "./settings.js";

export const Menu = {
  // callback functions
  onStart: noop,
  onSettings: noop,
  onQuit: noop,

  // references to DOM elements
  body: document.body,
  menu: find("menu"),

  // options can be onStart: Fn, onSettings: Fn, onQuit: Fn
  createMenu(options = {}) {
    // hang onto the onStart callback for future use
    if (options.onStart) this.onStart = options.onStart;

    // clear the contents of menu
    this.menu.innerHTML = "";

    this.styleMenu();
    this.addStartButton(() => {
      Sound.playSound("oof.m4a");

      // if there's an onStart listener, then call it
      this.onStart?.();
    });

    // start the music
    Sound.playMusic("./game/music/menusong.mp3", {
      volume: 0.2,
      loop: true,
      autoplay: true,
    });
  },
  showMenu() {
    show(menu, { animate: 5.0 });
  },
  hideMenu() {
    hide(menu, { animate: 0.5 });
  },
  styleMenu() {
    // style the menu
    this.menu.style.width = "600px";
    this.menu.style.height = "600px";
    this.menu.style.boxShadow = "10px 10px 30px black";
    this.menu.style.backgroundImage = "url('./game/backgrounds/bg_menu.jpg')";
    this.menu.style.backgroundSize = "cover";
    this.menu.style.position = "absolute";
    this.menu.style.top = "50%";
    this.menu.style.left = "50%";
    this.menu.style.transform = "translate(-50%, -50%)";
    this.menu.style.borderRadius = "50px";
  },
  addStartButton(callback) {
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
    startButton.addEventListener("click", callback);

    // add it to the menu
    this.menu.appendChild(startButton);
  },
};
