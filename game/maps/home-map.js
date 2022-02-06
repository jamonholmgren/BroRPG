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
  character: {
    x: 8,
    y: 4,
  },
  npcs: [
    {
      name: "Tanford",
      type: "villager",
      x: 8,
      y: 8,
      hp: 40,
      maxHP: 50,
      disposition: "friendly",
      inventory: [
        {
          name: "Healing Potion",
          type: "potion",
          hp: 20,
        },
      ],
      wielded: false,
      behaviors: {
        // these are just ideas. don't actually use them
        step: (response) => {
          if (this.hp < 40) {
            // do some sort of healing behavior
            if (this.inventory.includes("Healing Potion")) {
              response.heal();
            }
          } else {
            response.doDefaultResponse();
          }
        },
        talk: (response) => {
          if (this.hp < 30) {
            response.talk("I'm really hurt. I need to heal up.");
          } else {
            response.talk("I'm fine. I'm just a villager.");
          }
        },
        takeDamage: (response) => {
          if (this.hp < 30) {
            response.talk("Why are you hitting me?!");
            response.runAway();
          } else {
            response.doDefaultResponse();
          }
        },
      },
    },
    {
      name: "Grüvsch",
      type: "goblin",
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
          speed: 1,
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
      dialogue: ["Hhrnnnnggggghhhhhh!", "Ruggghh!", "Rrrrrrrrggghh!"],
    },
  ],
};
