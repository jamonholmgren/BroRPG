export type Disposition =
  | "friendly"
  | "helpful"
  | "neutral"
  | "evasive"
  | "defensive"
  | "hostile";

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
  behaviors?: {
    [k: string]: (self: NPC) => void;
  };
};

export type MapType = {
  ascii: string;
  playerPresets: Partial<Player>;
  npcs: NPC[];
};

export type Dom = {
  [k: string]: HTMLElement;
};
