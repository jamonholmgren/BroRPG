import { Menu } from "./menu.js";
import { World } from "./world.js";
import { Audio } from "./audio.js";
import { find, show, hide } from "./utilities.js";
import { Controls } from "./controls.js";

export const Game = {
  // character state
  character: {
    element: undefined,
    x: 3,
    y: 3,
  },

  body: document.body,
  gameView: find("game"),
  menu: find("menu"),
  tiles: undefined,
  init() {
    // hide everything so we can build it
    hide(this.gameView);
    hide(this.menu);

    // make the background dark gray
    this.body.style.backgroundColor = "#333333";

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

      this.addPlayPauseButton();

      // Menu can start the game, so let's subscribe to that event
      Menu.onStart(() => this.onStartGame());
    });

    this.body.appendChild(startButton);
  },
  onStartGame() {
    Menu.hideMenu();

    // load the world
    World.load();

    // set up the game canvas and show it
    this.styleGameCanvas();
    show(this.gameView);

    // build tiles
    this.tiles = World.buildTiles();
    this.tiles.style.position = "absolute";
    this.tiles.style.transition = "transform 0.5s";
    this.gameView.appendChild(this.tiles);

    this.centerGameView();

    // add the character
    this.character.element = document.createElement("div");
    this.character.element.id = "character";
    this.character.element.style.position = "absolute";
    this.character.element.style.width = "32px";
    this.character.element.style.height = "32px";
    this.character.element.style.zIndex = "1";
    this.character.element.style.backgroundColor = "red";
    this.character.element.style.transition = "top 0.5s, left 0.5s";
    this.tiles.appendChild(this.character.element);

    // update all movables' positions
    this.updateMovables();

    // listen for key presses
    Controls.init();
    Controls.on("w", () => this.moveCharacter(0, -1));
    Controls.on("a", () => this.moveCharacter(-1, 0));
    Controls.on("s", () => this.moveCharacter(0, 1));
    Controls.on("d", () => this.moveCharacter(1, 0));

    Controls.on("q", () => this.moveCharacter(-1, -1));
    Controls.on("e", () => this.moveCharacter(1, -1));
    Controls.on("z", () => this.moveCharacter(-1, 1));
    Controls.on("c", () => this.moveCharacter(1, 1));
  },
  moveCharacter(x, y) {
    const newX = this.character.x + x;
    const newY = this.character.y + y;

    // check for collisions
    if (World.isPassable(newX, newY)) {
      this.character.x = newX;
      this.character.y = newY;
      this.updateMovables();
      this.centerGameView();
    } else {
      // play some sound, like "oof"
      console.log("oof");
    }
  },
  updateMovables() {
    // update the character's element to match its position on the tile map
    this.character.element.style.top = `${this.character.y * 32}px`;
    this.character.element.style.left = `${this.character.x * 32}px`;
  },
  centerGameView() {
    // center the game view on the character
    const tx = -this.character.x * 32 - 16 + 300;
    const ty = -this.character.y * 32 - 16 + 300;
    this.tiles.style.transform = `translate(${tx}px, ${ty}px)`;
  },
  styleGameCanvas() {
    // clear the contents of game
    this.gameView.innerHTML = "";

    // style the game canvas
    this.gameView.style.width = "600px";
    this.gameView.style.height = "600px";
    this.gameView.style.boxShadow = "10px 10px 30px black";
    // this.gameView.style.backgroundImage = "url('/game/backgrounds/bg_game.jpg')";
    this.gameView.style.backgroundColor = "#314432";
    this.gameView.style.backgroundSize = "cover";
    this.gameView.style.position = "absolute";
    this.gameView.style.top = "50%";
    this.gameView.style.left = "50%";
    this.gameView.style.transform = "translate(-50%, -50%)";
    this.gameView.style.borderRadius = "50px";
    this.gameView.style.overflow = "hidden";
  },
  addPlayPauseButton() {
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
    this.body.appendChild(playPauseButton);
  },
};
