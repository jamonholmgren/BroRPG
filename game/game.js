import { Menu } from "./menu.js";
import { Sound } from "./sound.js";
import { find, show, hide, buildTiles } from "./utilities.js";
import { Controls } from "./controls.js";
import { Settings } from "./settings.js";

import { HomeMap } from "./maps/home-map.js";

export const Game = {
  // world state

  /** @type {import("./types").MapType} */
  map: undefined,
  passableTiles: [" ", ";", "-", "="],
  /** @type {string[][]} */
  tiles: undefined,

  // player state
  /** @type {import("./types").Player} */
  player: {
    name: "Adventurer",
    hp: 100,
    maxHP: 100,
    race: "human",
    x: 0,
    y: 0,
    inventory: [],
    wielded: false,
  },
  /** @type {import("./types").NPC[]} */
  npcs: [],

  // references to DOM elements
  dom: {
    body: document.body,
    gameView: find("game"),
    menu: find("menu"),
    playPauseButton: undefined,
    tileWrapper: undefined,
  },

  // set up the game
  init() {
    // load the settings
    Settings.loadSettings();

    // hide everything so we can build it
    hide(this.gameView);
    hide(this.menu);

    // make the background dark gray
    this.dom.body.style.backgroundColor = "#333333";

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
    this.currentMap = HomeMap;

    // set up the game canvas and show it
    this.styleGameCanvas();
    show(this.gameView);

    // build tiles and add them to the gameView
    this.dom.tileWrapper = buildTiles(this.currentMap.ascii);
    this.dom.tileWrapper.style.position = "absolute";
    this.dom.tileWrapper.style.transition = "transform 0.5s";
    this.dom.gameView.appendChild(this.dom.tileWrapper);

    // add player with the map's built-in preset properties
    Object.assign(this.player, this.map.playerPresets);

    // add all NPCs (and copy them over so they're a copy with .slice())
    Object.assign(this.npcs, this.map.npcs.slice());

    // add the player and NPCs to the gameView
    this.addPlayer();
    this.addNpcs();

    // update all characters' positions (NPCs and player)
    this.updateCharacters();

    // now center the game view on the player
    this.centerGameView();

    // listen for key presses
    this.setupKeys();
  },
  movePlayer(x, y) {
    const newX = this.player.x + x;
    const newY = this.player.y + y;

    // check for collisions
    if (this.isPassable(newX, newY)) {
      this.player.x = newX;
      this.player.y = newY;
      this.updateCharacters();
      this.centerGameView();
    } else {
      Sound.playSound("oof.m4a");
    }
  },
  updateCharacters() {
    // update the player's element to match its position on the tile map
    this.player.element.style.top = `${this.player.y * 32}px`;
    this.player.element.style.left = `${this.player.x * 32}px`;

    // update the npcs' elements to match their positions on the tile map
    this.npcs.forEach((npc) => {
      npc.element.style.top = `${npc.y * 32}px`;
      npc.element.style.left = `${npc.x * 32}px`;
    });
  },
  centerGameView() {
    // center the game view on the player
    const tx = -this.player.x * 32 - 16 + 300;
    const ty = -this.player.y * 32 - 16 + 300;
    this.dom.tileWrapper.style.transform = `translate(${tx}px, ${ty}px)`;
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

    this.dom.body.appendChild(startButton);
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
    this.dom.body.appendChild(this.playPauseButton);
  },
  addPlayer() {
    // add the player to the gameView
    this.player.element = document.createElement("div");
    this.player.element.id = "player";
    this.player.element.style.position = "absolute";
    this.player.element.style.width = "32px";
    this.player.element.style.height = "32px";
    this.player.element.style.zIndex = "100";
    // this.player.element.style.backgroundColor = "dodgerblue";
    // the player's type will be used to set the sprite
    this.player.element.style.backgroundImage = `url(./game/characters/${this.player.race}.png)`;
    this.player.element.style.transition = "top 0.5s, left 0.5s";
    this.dom.tileWrapper.appendChild(this.player.element);
  },
  addNpcs() {
    this.npcs.forEach((npc) => {
      npc.element = document.createElement("div");
      npc.element.id = "npc";
      npc.element.style.position = "absolute";
      npc.element.style.width = "32px";
      npc.element.style.height = "32px";
      npc.element.style.zIndex = "4";
      // npc.element.style.backgroundColor = "red";
      // the npc's type will be used to set the sprite
      npc.element.style.backgroundImage = `url(./game/characters/${npc.race}.png)`;
      npc.element.style.transition = "top 0.5s, left 0.5s";
      this.dom.tileWrapper.appendChild(npc.element);
    });
  },
  playPauseMusic() {
    if (Settings.settings.music) {
      this.playPauseButton.innerText = "Pause Music";
      Sound.resumeMusic();
    } else {
      this.playPauseButton.innerText = "Play Music";
      Sound.pauseMusic();
    }
  },
  setupKeys() {
    Controls.init();
    Controls.on("w", () => this.movePlayer(0, -1));
    Controls.on("a", () => this.movePlayer(-1, 0));
    Controls.on("s", () => this.movePlayer(0, 1));
    Controls.on("x", () => this.movePlayer(0, 1));
    Controls.on("d", () => this.movePlayer(1, 0));

    Controls.on("q", () => this.movePlayer(-1, -1));
    Controls.on("e", () => this.movePlayer(1, -1));
    Controls.on("z", () => this.movePlayer(-1, 1));
    Controls.on("c", () => this.movePlayer(1, 1));
  },

  /**
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  isPassable(x, y) {
    return this.passableTiles.includes(this.tiles[y][x]);
  },
};
