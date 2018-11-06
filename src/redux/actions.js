import { CLICK_TILE, INIT_GAME } from './actionTypes';

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
