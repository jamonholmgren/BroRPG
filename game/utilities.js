export function noop() {
  // doesn't do anything -- it's a "no-operation"
}

export function find(id) {
  return document.getElementById(id);
}

export function show(element, options = {}) {
  if (options.animate) {
    // if options.animate is true, then animate the element's opacity
    element.style.opacity = 0;
    element.style.display = "block";

    // for some reason we need to delay this to make it animate properly?
    setTimeout(() => {
      element.style.transition = `opacity ${options.animate}s`;
      element.style.opacity = 1;
    }, 1);

    // when it's done, show the element and remove the transition
    setTimeout(() => {
      show(element);
      element.style.transition = "";
    }, options.animate * 1000);
  } else {
    element.style.display = "block";
    element.style.opacity = 1;
  }
}

/**
 * Hide an element with an optional fading animation.
 *
 * @param {DomElement} element
 * @param {{ animate: number }} options
 */
export function hide(element, options = {}) {
  if (options.animate) {
    // if options.animate is true, then animate the element's opacity
    element.style.transition = `opacity ${options.animate}s`;
    element.style.opacity = 0;

    // when it's done, hide the element and remove the transition
    setTimeout(() => {
      hide(element);
      element.style.transition = "";
    }, options.animate * 1000);
  } else {
    element.style.display = "none";
    element.style.opacity = 0;
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

export function buildTileMap(mapStr) {
  return mapStr.split("\n").map((line) => splitChars(line));
}
