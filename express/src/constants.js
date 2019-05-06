import { List, Map } from 'immutable';

export const INITIAL_STATE = {
  x: 250,
  y: 113,
  columns: 8,
  rows: 8,
  tileWidth: 40,
  tileHeight: 40,
  tiles: List([]),
  solved: false
};

export const solvedTiles = List ([
  List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, "shifter": 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 3, "shifter": 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 2, "shifter": 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 4, "shifter": 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 4, "shifter": 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }) ])
]);

export const unsolvedTiles = List ([
  List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, "shifter": 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 3, "shifter": 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 2, "shifter": 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 4, "shifter": 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 4, "shifter": 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }) ])
]);

export const solvedTilesAndSelected = List ([
  List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 4, shifter: 0, selected: true }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, "shifter": 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 3, "shifter": 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 2, "shifter": 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 0, "shifter": 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }), Map ({ type: 4, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 4, "shifter": 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }) ]),
  List ([ Map ({ type: 0, shifter: 0, selected: false }), Map ({ type: 3, shifter: 0, selected: false }), Map ({ type: 1, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }), Map ({ type: 4, "shifter": 0, selected: false }), Map ({ type: 6, shifter: 0, selected: false }), Map ({ type: 5, shifter: 0, selected: false }), Map ({ type: 2, shifter: 0, selected: false }) ])
]);

export const solvedTilesArray = [
  [ 0, 4, 4, 0, 0, 2, 0, 2 ],
  [ 2, 5, 2, 0, 3, 4, 3, 6 ],
  [ 6, 1, 6, 2, 0, 5, 1, 0 ],
  [ 4, 2, 5, 3, 3, 1, 5, 1 ],
  [ 0, 4, 3, 6, 2, 0, 5, 1 ],
  [ 1, 1, 5, 4, 0, 3, 4, 4 ],
  [ 0, 2, 0, 3, 4, 5, 5, 6 ],
  [ 0, 3, 1, 2, 4, 6, 5, 2 ]
];

// module.exports = {
//     INITIAL_STATE: INITIAL_STATE,
//     solvedTiles: solvedTiles,
//     unsolvedTiles: unsolvedTiles,
//     solvedTilesArray: solvedTilesArray,
//     solvedTilesAndSelected: solvedTilesAndSelected
// }
