const { CLICK_TILE, INIT_GAME, AVAILABLE_MOVES } = require('./actionTypes');

//referece for each iteration of the board

const clickTile = content => ({
    type: CLICK_TILE,
    payload: {
        col: content.col,
        row: content.row,
        selected: content.selected,
    }
});

const initGame = content => ({
    type: INIT_GAME,
})

const checkAvailableMoves = content => ({
    type: AVAILABLE_MOVES,
})

module.exports = {
    initGame: initGame,
    checkAvailableMoves: checkAvailableMoves,
    clickTile: clickTile
}
