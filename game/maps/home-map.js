import { splitChars } from "../utilities.js";

export const HomeMap = {
  map: `
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
  tiles() {
    return this.map.split("\n").map((line) => splitChars(line));
  },
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
      disposition: "friendly",
      dialogue: [
        "Hello there, I'm Tanford.",
        "Yeah, there's a town down the road to the southeast.",
        "Some weather we've been having lately, eh?",
        "I've been hearing a lot of wolves howling lately.",
        "You sure like talking to people, don't you?",
      ],
    },
    {
      name: "Grüvsch",
      type: "goblin",
      x: 20,
      y: 10,
      hp: 50,
      disposition: "hostile",
      dialogue: ["Hhrnnnnggggghhhhhh!", "Ruggghh!", "Rrrrrrrrggghh!"],
    },
  ],
};
