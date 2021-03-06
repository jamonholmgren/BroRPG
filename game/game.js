import { Menu } from "./menu.js";
import { Sound } from "./sound.js";
import { find, show, hide, buildTiles, buildTileMap } from "./utilities.js";
import { Controls } from "./controls.js";
import { Settings } from "./settings.js";

import { HomeMap } from "./maps/home-map.js";
import { Behaviors } from "./behaviors.js";

export const Game = {
  // world state

  /** @type {MapType} */
  map: undefined,
  passableTiles: [" ", ";", "-", "="],
  /** @type {string[][]} */
  tiles: undefined,

  /** @type {Player} */
  player: {
    name: "Adventurer",
    hp: 100,
    maxHP: 100,
    speed: 10, // 10 is normal time
    currentTime: 0,
    race: "human",
    x: 0,
    y: 0,
    inventory: [],
    wielded: false,
  },

  /** @type {NPC[]} */
  npcs: [],

  // references to DOM elements
  /** @type {Dom} */
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
    hide(this.dom.gameView);
    hide(this.dom.menu);

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
    this.tiles = buildTileMap(this.currentMap.ascii);

    // set up the game canvas and show it
    this.styleGameCanvas();
    show(this.dom.gameView);

    // build tiles and add them to the gameView
    this.dom.tileWrapper = buildTiles(this.tiles);
    this.dom.tileWrapper.style.position = "absolute";
    this.dom.tileWrapper.style.transition = "transform 0.5s";
    this.dom.gameView.appendChild(this.dom.tileWrapper);

    // add player with the map's built-in preset properties
    Object.assign(this.player, this.currentMap.playerPresets);

    // add all NPCs (and copy them over so they're a copy with .slice())
    Object.assign(this.npcs, this.currentMap.npcs.slice());

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

  /**
   * @param {number} x
   * @param {number} y
   */
  movePlayer(x, y) {
    const newX = this.player.x + x;
    const newY = this.player.y + y;

    // check for collisions
    if (this.isPassable(newX, newY)) {
      this.player.x = newX;
      this.player.y = newY;
      this.updateCharacters();
      this.centerGameView();

      // moves player forward in time
      this.player.currentTime += this.player.speed;

      // check if any NPCs are ready to move next, and move them
      this.moveNPCs();
    } else {
      Sound.playSound("oof.m4a");
    }
  },
  moveNPCs() {
    let npcToMove = undefined;
    this.npcs.forEach((npc) => {
      if (npc.currentTime < (npcToMove?.currentTime || this.player.currentTime)) {
        npcToMove = npc;
      }
    });

    console.log(npcToMove);

    // player is the next to move
    if (!npcToMove) return;

    // move the NPC
    // the passing in of isPassible is a bit of a hack, but it works
    Behaviors.moveNPC(npcToMove, { isPassable: this.isPassable.bind(this) });

    // run it again (tail call recursion, anyone?)
    this.moveNPCs();
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
    this.dom.gameView.innerHTML = "";

    // style the game canvas
    this.dom.gameView.style.width = "600px";
    this.dom.gameView.style.height = "600px";
    this.dom.gameView.style.boxShadow = "10px 10px 30px black";
    this.dom.gameView.style.backgroundColor = "#314432";
    this.dom.gameView.style.backgroundSize = "cover";
    this.dom.gameView.style.position = "absolute";
    this.dom.gameView.style.top = "50%";
    this.dom.gameView.style.left = "50%";
    this.dom.gameView.style.transform = "translate(-50%, -50%)";
    this.dom.gameView.style.borderRadius = "50px";
    this.dom.gameView.style.overflow = "hidden";
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

    // when clicked, toggle the music (and save the setting)
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
    // the player's race will be used to set the sprite
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
      // the npc's race will be used to set the sprite
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

  /** @type {(x: number, y: number) => boolean} */
  isPassable(x, y) {
    return this.passableTiles.includes(this.tiles[y][x]);
  },
};
