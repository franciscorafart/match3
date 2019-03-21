const { CLICK_TILE, INIT_GAME } = require('./actionTypes');

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

module.exports = {
    initGame: initGame,
    clickTile: clickTile
}
