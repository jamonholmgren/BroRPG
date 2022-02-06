import { Menu } from "./menu.js";
import { World } from "./world.js";
import { Audio } from "./audio.js";
import { find, show, hide } from "./utilities.js";
import { Controls } from "./controls.js";
import { Settings } from "./settings.js";

export const Game = {
  // character state
  character: {
    name: "Adventurer",
    hp: 100,
    maxHp: 100,
    type: "ranger",
    x: 0,
    y: 0,
    element: undefined,
  },
  npcs: [],

  // references to DOM elements
  body: document.body,
  gameView: find("game"),
  menu: find("menu"),
  playPauseButton: undefined,
  tiles: undefined,

  // set up the game
  init() {
    // load the settings
    Settings.loadSettings();

    // hide everything so we can build it
    hide(this.gameView);
    hide(this.menu);

    // make the background dark gray
    this.body.style.backgroundColor = "#333333";

    // TEMPORARY! Will replace this later with something better
    // make a single Start button in the middle of the screen
    this.addStartButton(() => {
      find("start-button").remove();
      // create the menu
      this.addMenu();
      this.addPlayPauseButton();
    });
  },
  onStartGame() {
    // load the world
    World.load();

    // set up the game canvas and show it
    this.styleGameCanvas();
    show(this.gameView);

    // build tiles and add them to the gameView
    this.tiles = World.buildTiles();
    this.tiles.style.position = "absolute";
    this.tiles.style.transition = "transform 0.5s";
    this.gameView.appendChild(this.tiles);

    // add character
    Object.assign(this.character, World.map.character);
    Object.assign(this.npcs, World.map.npcs);

    this.addCharacter();
    this.addNpcs();

    // update all movables' positions
    this.updateMovables();

    // now center the game view on the character
    this.centerGameView();

    // listen for key presses
    this.setupKeys();
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

    // update the npcs' elements to match their positions on the tile map
    this.npcs.forEach((npc) => {
      npc.element.style.top = `${npc.y * 32}px`;
      npc.element.style.left = `${npc.x * 32}px`;
    });
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
    this.gameView.style.backgroundColor = "#314432";
    this.gameView.style.backgroundSize = "cover";
    this.gameView.style.position = "absolute";
    this.gameView.style.top = "50%";
    this.gameView.style.left = "50%";
    this.gameView.style.transform = "translate(-50%, -50%)";
    this.gameView.style.borderRadius = "50px";
    this.gameView.style.overflow = "hidden";
  },
  addMenu() {
    Menu.createMenu({
      onStart: () => {
        Menu.hideMenu();
        this.onStartGame();
      },
    });
    Menu.showMenu();
  },
  addStartButton(onClick) {
    const startButton = document.createElement("button");
    startButton.id = "start-button";
    startButton.innerText = "Start BroRPG";

    startButton.style.position = "absolute";
    startButton.style.top = "50%";
    startButton.style.left = "50%";
    startButton.style.transform = "translate(-50%, -50%)";
    startButton.style.cursor = "pointer";
    startButton.style.zIndex = "1";
    startButton.addEventListener("click", onClick);

    this.body.appendChild(startButton);
  },
  addPlayPauseButton() {
    // Add a play/pause button to the top right of the screen
    this.playPauseButton = document.createElement("button");
    this.playPauseButton.id = "play-pause-button";
    this.playPauseButton.innerText = "Pause Music";
    this.playPauseButton.style.position = "absolute";
    this.playPauseButton.style.top = "10px";
    this.playPauseButton.style.right = "10px";
    this.playPauseButton.style.cursor = "pointer";
    this.playPauseButton.style.zIndex = "1";

    this.playPauseMusic();

    this.playPauseButton.addEventListener("click", () => {
      Settings.settings.music = !Settings.settings.music;
      Settings.saveSettings();

      this.playPauseMusic();
    });
    this.body.appendChild(playPauseButton);
  },
  addCharacter() {
    // add the character to the gameView
    this.character.element = document.createElement("div");
    this.character.element.id = "character";
    this.character.element.style.position = "absolute";
    this.character.element.style.width = "32px";
    this.character.element.style.height = "32px";
    this.character.element.style.zIndex = 100;
    // this.character.element.style.backgroundColor = "dodgerblue";
    // the character's type will be used to set the sprite
    this.character.element.style.backgroundImage = `url(./game/characters/${this.character.type}.png)`;
    this.character.element.style.transition = "top 0.5s, left 0.5s";
    this.tiles.appendChild(this.character.element);
  },
  addNpcs() {
    this.npcs.forEach((npc) => {
      npc.element = document.createElement("div");
      npc.element.id = "npc";
      npc.element.style.position = "absolute";
      npc.element.style.width = "32px";
      npc.element.style.height = "32px";
      npc.element.style.zIndex = 4;
      // npc.element.style.backgroundColor = "red";
      // the npc's type will be used to set the sprite
      npc.element.style.backgroundImage = `url(./game/characters/${npc.type}.png)`;
      npc.element.style.transition = "top 0.5s, left 0.5s";
      this.tiles.appendChild(npc.element);
    });
  },
  playPauseMusic() {
    if (Settings.settings.music) {
      this.playPauseButton.innerText = "Pause Music";
      Audio.resumeMusic();
    } else {
      this.playPauseButton.innerText = "Play Music";
      Audio.pauseMusic();
    }
  },
  setupKeys() {
    Controls.init();
    Controls.on("w", () => this.moveCharacter(0, -1));
    Controls.on("a", () => this.moveCharacter(-1, 0));
    Controls.on("s", () => this.moveCharacter(0, 1));
    Controls.on("x", () => this.moveCharacter(0, 1));
    Controls.on("d", () => this.moveCharacter(1, 0));

    Controls.on("q", () => this.moveCharacter(-1, -1));
    Controls.on("e", () => this.moveCharacter(1, -1));
    Controls.on("z", () => this.moveCharacter(-1, 1));
    Controls.on("c", () => this.moveCharacter(1, 1));
  },
};
