export const Controls = {
  keyListeners: {},
  onKeyPress(event) {
    const callback = this.keyListeners[event.key];
    if (callback) callback();
  },
  init() {
    window.addEventListener("keypress", this.onKeyPress.bind(this));
  },
  on(key, callback) {
    this.keyListeners[key] = callback;
  },
};
