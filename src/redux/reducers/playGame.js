import { CLICK_TILE } from '../actionTypes';
import { INITIAL_STATE } from '../../constants';
import { addSelected, printableTiles} from '../../resources/functions';

const initialState =  INITIAL_STATE;

export default function(state=initialState, action){
    console.log('action', action)

    //TODO: solve its getting the initial state when clicked and not the new state
    console.log('state', state)

    switch (action.type) {
        case CLICK_TILE: {
            const content = action.payload;

            let selectedPrevious = content.selected;
            let newTiles;

            if(!selectedPrevious){//if user selected
                newTiles = addSelected(content.col, content.row, true, state)
                    // this.props.addSelected(this.props.col, this.props.row, true)
            } else {
                newTiles = addSelected(content.col, content.row, false, state)
                // this.props.addSelected(this.props.col, this.props.row, false)
            }


            // let newTiles = addSelected(state)
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
