import {
    INIT_GAME,
    INIT_GAME_ACTION,
    CLICK_TILE,
    CLICK_TILE_ACTION,
} from './actionTypes';

export const initGameAction = content => ({
    type: INIT_GAME_ACTION
})
export const initGame = content => ({
    type: INIT_GAME,
    payload: {
        tiles: content.tiles
    }
})

export const clickTileAction = content => ({
    type: CLICK_TILE_ACTION,
    payload: content
})
//referece for each iteration of the board
export const clickTile = content => ({
    type: CLICK_TILE,
    payload: {
        tiles: content.tiles,
        sequence: content.sequence,
        col: content.col,
        row: content.row,
        selected: content.selected,

    }
});
