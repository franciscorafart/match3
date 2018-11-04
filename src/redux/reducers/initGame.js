import { INIT_GAME } from '../actionTypes';
import { INITIAL_STATE } from '../../constants';
import { initializeLevel, printableTiles } from '../../resources/functions'

const initialState =  INITIAL_STATE;

//NOTE: reducers change state based on what the action tells it to do
export default function(state = initialState, action){
    console.log('in initGame!!!!', 'action: ', action, 'state: ', state)
    switch (action.type) {
        case INIT_GAME: {
            const { content } = action.payload; //For init there won't be action payload really

            //TODO: Initialize function passing initial state???
            let newTiles = initializeLevel(state)
            console.log(printableTiles('new Tiles from initGame.js', newTiles))

            return {
                ...state,
                tiles: newTiles
            }
        }
        default: {
            return state;
        }
    }
}

// export default initGame;
