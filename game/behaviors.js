/** @typedef {(npc: NPC, options: { isPassable: (x: number, y: number) => boolean }) => void} Behavior */

export const Behaviors = {
  /** @type {Behavior} */
  moveNPC(npc, options) {
    switch (npc.intention) {
      case "wandering":
        this.wander(npc, options);
        break;
      case "chasing":
        this.chase(npc, options);
        break;
      case "fleeing":
        this.flee(npc, options);
        break;
      default:
        throw new Error(`Unknown NPC intention: ${npc.intention}`);
    }
  },

  /** @type {Behavior} */
  wander(npc, options) {
    // choose a random x and y to move to
    const x = Math.floor(Math.random() * 3) - 1;
    const y = Math.floor(Math.random() * 3) - 1;

    // if the chosen x and y are not the same as the current x and y, move to the new x and y
    if (options.isPassable(npc.x + x, npc.y + y)) {
      npc.x += x;
      npc.y += y;
      npc.currentTime += npc.speed;
    }
  },
};
