import { Menu } from "./menu.js";
import { World } from "./world.js";
import { Audio } from "./audio.js";
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

    // TEMPORARY! Will replace this later with something better
    // make a single Start button in the middle of the screen
    const startButton = document.createElement("button");
    startButton.id = "start-button";
    startButton.innerText = "Start with Music";
    startButton.style.position = "absolute";
    startButton.style.top = "50%";
    startButton.style.left = "50%";
    startButton.style.transform = "translate(-50%, -50%)";
    startButton.style.cursor = "pointer";
    startButton.style.zIndex = "1";
    startButton.addEventListener("click", () => {
      startButton.remove();
      // create the menu
      Menu.createMenu();
      Menu.showMenu();

      // Add a play/pause button to the top right of the screen
      const playPauseButton = document.createElement("button");
      playPauseButton.id = "play-pause-button";
      playPauseButton.innerText = "Pause Music";
      playPauseButton.style.position = "absolute";
      playPauseButton.style.top = "10px";
      playPauseButton.style.right = "10px";
      playPauseButton.style.cursor = "pointer";
      playPauseButton.style.zIndex = "1";
      playPauseButton.addEventListener("click", () => {
        if (playPauseButton.innerText === "Play Music") {
          playPauseButton.innerText = "Pause Music";
          Audio.resumeMusic();
        } else {
          playPauseButton.innerText = "Play Music";
          Audio.pauseMusic();
        }
      });
      body.appendChild(playPauseButton);

      // Menu can start the game, so let's subscribe to that event
      Menu.onStart(() => this.onStartGame());
    });

    body.appendChild(startButton);
  },
  onStartGame() {
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
