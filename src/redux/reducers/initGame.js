import { INIT_GAME, CLICK_TILE, AVAILABLE_MOVES} from '../actionTypes';
import { INITIAL_STATE } from '../../constants';
import { initializeLevel, addSelectedOneMove, playOneMove, findClusters, resolveOneCluster, printableTiles, shiftTiles} from '../../resources/functions'

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
            console.log('Click Tile!')
            let selectedPrevious = content.selected;
            let newTiles=null;

            if(!selectedPrevious)//if user selected
                newTiles = addSelectedOneMove(content.col, content.row, true, state.tiles)
            else
                newTiles = addSelectedOneMove(content.col, content.row, false, state.tiles)

            return {
                tiles: newTiles
            }
        }
        //Action to check if there are more moves
        case AVAILABLE_MOVES:{
            let clusters = findClusters(state.tiles)

            if (clusters.length > 0){
                let newTiles = shiftTiles(state.tiles)
                return {
                    tiles: newTiles
                }
            }
                //Is returning null the correct as to have no effect
            return {tiles: state.tiles}
        }

        default: {
            return state;
        }
    }
}
