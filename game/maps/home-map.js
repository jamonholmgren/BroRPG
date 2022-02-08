export const HomeMap = {
  ascii: `
###############################################################################
#                                                                             #
#     *******              TTTTTTTTTTTT                                       #
#     *     *           TTTTTTTTTTTTTTTTTT                                    #
#     *     *       TTTTTTTTTTTTTTTTTTTTTTT                   *****           #
#     ***;***             TTTTTTTTTTTTTTTTT                   *   *           #
#                            TTTTTTTTTTTTTT                   *   *           #
#-------------------------                      -----------   ;   *           #
#                        ----                  --             *   *           #
#    TTTTTTTTTTTTTTT         --               --              *   *           #
#   TTTTTTTTTTTTTTTTTTTT      --             --               *****           #
#    TTTTTTTTTTTTTTTTTT        --           --                                #
#   TTTTTTTTTTTTTTTTT           --         --                                 #
#      TTTTTTTTTTTTT              ---------                                   #
#        TTTTTTTTTTT               --                                         #
#         TTTTTTTTTTTT            --                                          #
#         TTTTTTTTTTTTT          --                                           #
#     TTTTTTTTTTTTTTT            -                                            #
#                                -                                            #
#              ~~~~~~~~~~        -                                            #
#  ~~~~~~~~~~~~~         ~~~~    -   ~~~~~~~~~~~~~~~~~                        #
#~~                         ~~~~~=~~~~               ~~~~~~~~~~~~~            #
#                                -                               ~~~~~~~~~~~~ #
#                                -                                            #
#                                -                                            #
#                                -                                            #
#                                -                                            #
#                                -                                            #
#               ------------------                                          ^ #
#               -                --                                           #
#              --  ****** **;*    ---                                       ^ #
#             --   ;    * *  *      --                                        #
#            --    *    * *  *       ---------------------------------------- #
#           --     ****** ****                                                #
#          --                                                              ^  #
#-----------                                                                ^ #
#                                                                           ^ #
#                                                                             #
#                                                                             #
###############################################################################
`,
  playerPresets: {
    x: 8,
    y: 4,
  },
  /** @type {NPC[]} */
  npcs: [
    {
      name: "Tanford",
      race: "human",
      x: 8,
      y: 8,
      hp: 40,
      maxHP: 50,
      speed: 10, // 10 is normal time
      currentTime: 0,
      disposition: "friendly",
      intention: "wandering",
      target: undefined,
      inventory: [
        {
          name: "Healing Potion",
          type: "potion",
          onUse: (item, player) => {
            player.hp += 20;
            item.depleted = true;
          },
        },
      ],
      wielded: false,
      behaviors: {
        // these are just ideas. don't actually use them
        step: (self, action) => {
          if (self.hp < 40) {
            // do some sort of healing behavior
            const potion = self.inventory.find((i) => i.name === "Healing Potion");
            if (potion) {
              action.useInventoryItem(potion);
            }
          } else {
            action.defaultBehavior();
          }
        },
        talk: (self, action) => {
          if (self.hp < 30) {
            action.talk("I'm really hurt. I need to heal up.");
          } else {
            action.talk("I'm fine. I'm just a villager.");
          }
        },
        takeDamage: (self, action) => {
          if (self.hp < 30) {
            action.talk("Why are you hitting me?!");
            action.runAway();
          } else {
            action.defaultBehavior();
          }
        },
      },
    },
    {
      name: "Grüvsch",
      race: "goblin",
      x: 20,
      y: 10,
      hp: 50,
      maxHP: 50,
      speed: 5, // 10 is normal time
      currentTime: 0,
      disposition: "hostile",
      intention: "wandering",
      target: undefined,
      inventory: [
        {
          name: "Club",
          type: "weapon",
          damage: 10,
          onUse: (item, self, other) => {
            // do some sort of damage behavior
            // always damages itself too, and will eventually break
          },
        },
        {
          name: "Studded Leather Armor",
          type: "armor",
          armor: 5, // this is the amount of damage the armor reduces (and takes itself)
          damageTaken: 13, // already damaged somewhat
          durability: 30, // how much damage can be taken before it breaks
        },
      ],
      wielded: "Club",
    },
  ],
};
