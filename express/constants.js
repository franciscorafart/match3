const { List, Map } = require('immutable');

const INITIAL_STATE = {
    x: 250,
    y: 113,
    columns: 8,
    rows: 8,
    tilewidth: 40,
    tileheight: 40,
    tiles: List([]),
    solved: false
}

const solvedTiles = List ([
    List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, "shifter": 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 3, "shifter": 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 2, "shifter": 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 4, "shifter": 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 4, "shifter": 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }) ])
])

const unsolvedTiles = List ([
    List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, "shifter": 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 3, "shifter": 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 2, "shifter": 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 4, "shifter": 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }) ]),
    List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 4, "shifter": 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }) ])
])


module.exports = {
    INITIAL_STATE: INITIAL_STATE,
    solvedTiles: solvedTiles,
    unsolvedTiles: unsolvedTiles
}
