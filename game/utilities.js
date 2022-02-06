export function noop() {
  // doesn't do anything -- it's a "no-operation"
}

export function find(id) {
  return document.getElementById(id);
}

/**
 * Show an element with an optional fading animation.
 *
 * @param {HTMLElement} element
 * @param {{ animate?: number }} options
 */
export function show(element, options = {}) {
  if (options.animate) {
    // if options.animate is true, then animate the element's opacity
    element.style.opacity = "0";
    element.style.display = "block";

    // for some reason we need to delay this to make it animate properly?
    setTimeout(() => {
      element.style.transition = `opacity ${options.animate}s`;
      element.style.opacity = "1";
    }, 1);

    // when it's done, show the element and remove the transition
    setTimeout(() => {
      show(element);
      element.style.transition = "";
    }, options.animate * 1000);
  } else {
    element.style.display = "block";
    element.style.opacity = "1";
  }
}

/**
 * Hide an element with an optional fading animation.
 *
 * @param {HTMLElement} element
 * @param {{ animate?: number }} options
 */
export function hide(element, options = {}) {
  if (options.animate) {
    // if options.animate is true, then animate the element's opacity
    element.style.transition = `opacity ${options.animate}s`;
    element.style.opacity = "0";

    // when it's done, hide the element and remove the transition
    setTimeout(() => {
      hide(element);
      element.style.transition = "";
    }, options.animate * 1000);
  } else {
    element.style.display = "none";
    element.style.opacity = "0";
  }
}

// function to split strings into array of individual characters
export function splitChars(str) {
  const chars = [];
  for (let i = 0; i < str.length; i++) {
    chars.push(str.charAt(i));
  }
  return chars;
}

/**
 * @param {string} mapStr
 * @returns {string[][]}
 */
export function buildTileMap(mapStr) {
  return mapStr.split("\n").map((line) => splitChars(line));
}

/**
 * Builds an HTML element for each tile in the map and returns the wrapper.
 *
 * @param {string[][]} mapArray
 * @returns HTMLDivElement
 */
export function buildTiles(mapArray) {
  const tilesWrapper = document.createElement("div");
  tilesWrapper.id = "tiles";

  // build the tiles
  mapArray.forEach((row, rowIndex) => {
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
          tileElement.style.backgroundImage = "url(./game/tiles/grass1.png)";
          break;
        case "#": // World Edge
          tileElement.style.backgroundColor = "gray";
          break;
        case "*": //Wall
          tileElement.style.backgroundColor = "gray";
          break;
        case "T": //Tree
          tileElement.style.backgroundImage = "url(./game/tiles/tree1.png)";
          break;
        case "~": // Water
          tileElement.style.backgroundImage = "url(./game/tiles/water.png)";
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
        case "=": // Bridge
          tileElement.style.backgroundColor = "gray";
          break;
        case "^": // Mountain
          tileElement.style.backgroundColor = "gray";
          break;
        default:
          tileElement.style.backgroundColor = "transparent";
      }

      tilesWrapper.appendChild(tileElement);
    });
  });

  return tilesWrapper;
}
