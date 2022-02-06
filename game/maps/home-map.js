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
      dialogue: [
        "Hello there, I'm Tanford.",
        "Yeah, there's a town down the road to the southeast.",
        "Some weather we've been having lately, eh?",
        "I've been hearing a lot of wolves howling lately.",
        "You sure like talking to people, don't you?",
      ],
      behaviors: () => {
        if (this.hp < 40) {
          // do some sort of healing behavior
        }
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
      dialogue: ["Hhrnnnnggggghhhhhh!", "Ruggghh!", "Rrrrrrrrggghh!"],
    },
  ],
};
