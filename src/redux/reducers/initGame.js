import { INIT_GAME, CLICK_TILE } from '../actionTypes';
import { INITIAL_STATE } from '../../constants';
import { initializeLevel, addSelected } from '../../resources/functions'

const initialState =  INITIAL_STATE;

//NOTE: reducers change state based on what the action tells it to do
export default function(state = initialState, action){
    switch (action.type) {
        case INIT_GAME: {
            let newTiles = initializeLevel(state)

            return {
                ...state,
                tiles: newTiles
            }
        }

        case CLICK_TILE: {
            const content = action.payload;

            let selectedPrevious = content.selected;
            let newTiles=null;

            if(!selectedPrevious)//if user selected
                newTiles = addSelected(content.col, content.row, true, state.tiles)
            else
                newTiles = addSelected(content.col, content.row, false, state.tiles)

            return {
                // ...state,
                tiles: newTiles
            }
        }
        default: {
            return state;
        }
    }
}
