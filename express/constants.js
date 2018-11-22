const { List } = require('immutable');

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

module.exports = {
    INITIAL_STATE: INITIAL_STATE
}
