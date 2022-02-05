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
    // load the text file asynchronously
    const response = await fetch(`./maps/${mapName}.map`);
    const homeMapText = await response.text();

    // temporary, just for debugging
    this.mapText = homeMapText;

    // this splits the map into an array of arrays of chars, which represent the particular tile
    return homeMapText.split("\n").map((line) => splitChars(line));
  },
};
