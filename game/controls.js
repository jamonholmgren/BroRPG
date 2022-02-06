export const Controls = {
  cooldown: 0,
  cooldownTime: 0.2,
  cooldownTimer: undefined,

  /** @type {{[k: string]: Function}} keyListeners */
  keyListeners: {},

  /**
   * @param {KeyboardEvent} event
   */
  onKeyPress(event) {
    if (this.cooldown <= 0) {
      const callback = this.keyListeners[event.key];
      if (callback) callback();

      // reset cooldown
      clearInterval(this.cooldownTimer);
      this.cooldown = 1;
      const t = this;
      this.cooldownTimer = setTimeout(
        () => (t.cooldown = 0),
        this.cooldownTime * 1000
      );
    }
  },
  init() {
    window.addEventListener("keypress", this.onKeyPress.bind(this));
  },

  /**
   * @param {string} key
   * @param {Function} callback
   */
  on(key, callback) {
    this.keyListeners[key] = callback;
  },
};
