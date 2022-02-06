import { HomeMap } from "./maps/home-map.js";

export const World = {
  passableTiles: [" ", ";", "-","="],
  map: [],
  load() {
    this.map = HomeMap.tiles();
  },
  isPassable(x, y) {
    return this.passableTiles.includes(this.map[y][x]);
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
          case " ": // Grass
            tileElement.style.backgroundColor = "#425543";
            break;
          case "#": // World Edge
            tileElement.style.backgroundColor = "gray";
            break;
          case "T": //Tree
            tileElement.style.backgroundColor = "green";
            break;
          case "*": //Wall
            tileElement.style.backgroundColor = "gray";
            break;
          case "~": // Water
            tileElement.style.backgroundColor = "blue";
            break;
          case ";": // Door
            tileElement.style.backgroundColor = "red";
            break;
          case ",": // Rock
            tileElement.style.backgroundColor = "black";
            break;
          case "-": // Road
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
