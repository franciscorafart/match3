import { INIT_GAME, CLICK_TILE } from '../actionTypes';
import { INITIAL_STATE } from '../../constants';
import { initializeLevel, addSelected, printableTiles } from '../../resources/functions'

const initialState =  INITIAL_STATE;

//NOTE: reducers change state based on what the action tells it to do
export default function(state = initialState, action){
    console.log('in initGame.js')
    switch (action.type) {
        case INIT_GAME: {
            // const { content } = action.payload; //For init there won't be action payload really

            //TODO: Initialize function passing initial state???
            let newTiles = initializeLevel(state)

            return {
                ...state,
                tiles: newTiles
            }
        }
        case CLICK_TILE: {
            const content = action.payload;
            console.log('content: ', content)
            console.log('state', state)

            let selectedPrevious = content.selected;
            let newTiles;

            if(!selectedPrevious){//if user selected
                newTiles = addSelected(content.col, content.row, true, state)
                    // this.props.addSelected(this.props.col, this.props.row, true)
            } else {
                newTiles = addSelected(content.col, content.row, false, state)
                // this.props.addSelected(this.props.col, this.props.row, false)
            }


            console.log('newTiles', newTiles)
            console.log(printableTiles('tiles after play', newTiles))
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
