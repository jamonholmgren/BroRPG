/**
 * This file defines the "types" of data we have in the game.
 * So, if you want to add, for example, a new item type, you just need to add it below.
 *
 * We are using TypeScript here and JSDoc in the code. The reason for this is that
 * JSDoc is just comments, which means we don't need a build step in order to run
 * the code, but we also get TypeScript's excellent type checking in VS Code while
 * we are coding. It's the best of both worlds.
 *
 * An example of what JSDoc looks like:
 *
 * @type {CharacterRace}
 * This is a type definition. It's a way to tell TypeScript that the next line is
 * the CharacterRace type.
 *
 * TypeScript will then yell at you if you made the race property be, for example, "eagle",
 * which doesn't exist in the races below.
 *
 */

declare global {
  export type Disposition =
    | "friendly"
    | "helpful"
    | "neutral"
    | "evasive"
    | "defensive"
    | "hostile";

  export type Intention =
    | "idle"
    | "wandering"
    | "exploring"
    | "hunting"
    | "fleeing"
    | "escaping"
    | "returning"
    | "chasing"
    | "attacking"
    | "defending"
    | "retreating"
    | "stalking"
    | "escorting";

  export type CharacterRace = "human" | "goblin" | "troll" | "orc";

  export type ItemType = "weapon" | "shield" | "potion" | "armor" | "scroll";

  export type Item = {
    name: string;
    type: ItemType;
    damage?: number; // does damage?
    armor?: number; // soaks up damage?
    damageTaken?: number; // how much damage it's taken in its lifetime
    durability?: number; // if damageTaken >= durability, item is depleted
    depleted?: boolean; // if the item is depleted, it can't be used anymore
    onUse?: (item: Item, self: NPC | Player, other?: NPC | Player) => void;
  };

  export type Character = {
    name: string;
    race: CharacterRace;
    currentTime: number; // turn-based timer
    speed: number; // lower = faster
    x: number;
    y: number;
    hp: number;
    maxHP: number;
    inventory: Item[];
    wielded: string | false;
    element?: HTMLDivElement;
  };

  export type Player = Character & {
    // more traits here
  };

  export type NPC = Character & {
    disposition: Disposition;
    intention: Intention;
    target?: undefined | Character;
    behaviors?: {
      [k: string]: (self: NPC, action: NPCAction) => void;
    };
  };

  export type NPCAction = {
    defaultBehavior: () => void;
    useInventoryItem: (item: Item) => void;
  };

  export type MapType = {
    ascii: string;
    playerPresets: Partial<Player>;
    npcs: NPC[];
  };

  export type Dom = {
    [k: string]: HTMLElement;
  };
}

// trickery to tell TypeScript this is a real thing and let us use it everywhere
export {};
