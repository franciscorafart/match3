import { CLICK_TILE, INIT_GAME } from './actionTypes';

//referece for each iteration of the board
// boardId = 0;

export const clickTile = content => ({
    type: CLICK_TILE,
    payload: {
        content
    }
});

export const initGame = content => ({
    type: INIT_GAME,
    payload: {
        //TODO: include boardId?
        content
    }
})
