import { CLICK_TILE, INIT_GAME, AVAILABLE_MOVES } from './actionTypes';

//referece for each iteration of the board

export const clickTile = content => ({
    type: CLICK_TILE,
    payload: {
        col: content.col,
        row: content.row,
        selected: content.selected,
    }
});

export const initGame = content => ({
    type: INIT_GAME,
})

export const checkAvailableMoves = content => ({
    type: AVAILABLE_MOVES,
})
