import {
    INIT_GAME_ACTION,
    INIT_GAME,
    CLICK_TILE_ACTION,
    CLICK_TILE,
    AVAILABLE_MOVES
} from '../actionTypes';

import { INITIAL_STATE } from '../../constants';
import {
    initializeLevel, clickTile, availableMoves
} from '../../resources/functions'

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
            //TODO: Take this to the backend
            const content = action.payload;
            console.log('content in CLICK_TILE initGame.js', content)
            // let selectedPrevious = content.selected;

            //Front end code
            // let { newTiles, solved } = clickTile(state.tiles, content.col, content.row, selectedPrevious)
            //
            // return {
            //     tiles: newTiles,
            //     solved: solved
            // }
            return {
                ...state,
                tiles: content.tiles,
                solved: content.solved,
                sequence: content.sequence
            }
        }
        //Action to check if there are more moves
        case AVAILABLE_MOVES:{
            let { newTiles, solved } = availableMoves(state.tiles)

            return {
                tiles: newTiles,
                solved: solved
            }
        }

        default: {
            return state;
        }
    }
}
