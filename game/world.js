import { splitChars } from "./utilities.js";

export const World = {
  map: [],
  async load() {
    const map = await this.loadMap("home");
    this.map = map;
    console.log(map);
  },
  async loadMap(mapName) {
    // load the text file asynchronously
    const response = await fetch(`./game/maps/${mapName}.map`);
    const homeMapText = await response.text();

    // this splits the map into an array of arrays of chars, which represent the particular tile
    return homeMapText.split("\n").map((line) => splitChars(line));
  },
  buildTiles() {
    const tiles = document.createElement("div");
    tiles.id = "tiles";

    // build the tiles
    this.map.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        const tileElement = document.createElement("div");
        tileElement.className = tile;
        tileElement.style.position = "absolute";
        tileElement.style.top = `${rowIndex * 32}px`;
        tileElement.style.left = `${colIndex * 32}px`;
        tileElement.style.width = "32px";
        tileElement.style.height = "32px";
        tileElement.style.zIndex = "0";
        // change the background color of the tile based on the tile type
        switch (tile) {
          case " ":
            tileElement.style.backgroundColor = "#425543";
            break;
          case "#":
            tileElement.style.backgroundColor = "gray";
            break;
          case "T":
            tileElement.style.backgroundColor = "green";
            break;
          case "*":
            tileElement.style.backgroundColor = "gray";
            break;
          case "~":
            tileElement.style.backgroundColor = "blue";
            break;
          case ";":
            tileElement.style.backgroundColor = "red";
            break;
          case ",":
            tileElement.style.backgroundColor = "black";
            break;
          case "-":
            tileElement.style.backgroundColor = "brown";
            break;
          default:
            tileElement.style.backgroundColor = "transparent";
        }

        tiles.appendChild(tileElement);
      });
    });

    return tiles;
  },
};
