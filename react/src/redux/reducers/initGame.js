import {
    INIT_GAME_ACTION,
    INIT_GAME,
    CLICK_TILE_ACTION,
    CLICK_TILE,
    AVAILABLE_MOVES
} from '../actionTypes';

import { INITIAL_STATE } from '../../constants';


const initialState =  INITIAL_STATE;

//NOTE: reducers change state based on what the action tells it to do
export default function(state = initialState, action){
    switch (action.type) {
        case INIT_GAME_ACTION: {
            return {
                ...state
            }
        }
        case INIT_GAME: {
            const content = action.payload
            return {
                ...state,
                tiles: content.tiles,
                solved: true,
            }
        }
        case CLICK_TILE_ACTION: {
            return {
                ...state
            }
        }
        case CLICK_TILE: {
            const content = action.payload;

            return {
                ...state,
                tiles: content.tiles,
                solved: content.solved,
                sequence: content.sequence
            }
        }

        default: {
            return state;
        }
    }
}
