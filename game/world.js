import { splitChars } from "./utilities.js";

export const World = {
  map: [],
  mapText: "",
  async init() {
    const map = await this.loadMap("home");
    this.map = map;
    console.log(map);
  },
  data() {},
  async loadMap(mapName) {
    // load the text file
    const response = await fetch(`/game/maps/${mapName}.map`);
    const homeMapText = await response.text();
    this.mapText = homeMapText;
    return homeMapText.split("\n").map((line) => splitChars(line));
  },
};
