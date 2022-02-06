/** @type {import("../types").MapType} */
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
  npcs: [
    {
      name: "Tanford",
      race: "human",
      x: 8,
      y: 8,
      hp: 40,
      maxHP: 50,
      disposition: "friendly",
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
        step: (self) => {
          if (self.hp < 40) {
            // do some sort of healing behavior
            if (self.inventory.find((i) => i.name === "Healing Potion")) {
              self.useInventoryItem(i);
            }
          } else {
            self.doDefaultResponse();
          }
        },
        talk: (self) => {
          if (self.hp < 30) {
            self.talk("I'm really hurt. I need to heal up.");
          } else {
            self.talk("I'm fine. I'm just a villager.");
          }
        },
        takeDamage: (self) => {
          if (self.hp < 30) {
            self.talk("Why are you hitting me?!");
            self.runAway();
          } else {
            self.doDefaultResponse();
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
      disposition: "hostile",
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
