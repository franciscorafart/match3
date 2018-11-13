import { INIT_GAME, CLICK_TILE, AVAILABLE_MOVES} from '../actionTypes';
import { INITIAL_STATE } from '../../constants';
import {
    initializeLevel, addSelectedOneMove, findClusters,
    resolveOneCluster, shiftTiles
} from '../../resources/functions'

const initialState =  INITIAL_STATE;

//NOTE: reducers change state based on what the action tells it to do
export default function(state = initialState, action){
    switch (action.type) {
        case INIT_GAME: {
            let newTiles = initializeLevel(state)

            return {
                ...state,
                tiles: newTiles,
                solved: true
            }
        }

        case CLICK_TILE: {
            const content = action.payload;
            let solved = true
            console.log('Click Tile!')
            let selectedPrevious = content.selected;
            let newTiles=null;

            if(!selectedPrevious)//if user selected
                newTiles = addSelectedOneMove(content.col, content.row, true, state.tiles)
            else
                newTiles = addSelectedOneMove(content.col, content.row, false, state.tiles)

            let clusters = findClusters(newTiles)
            if (clusters.length>0)
                solved = false

            return {
                tiles: newTiles,
                solved: false
            }
        }
        //Action to check if there are more moves
        case AVAILABLE_MOVES:{
            //TODO: create a function in functions.js and refactor
            let clusters = findClusters(state.tiles)
            let solved = true

            if (clusters.length > 0){
                let newTiles = shiftTiles(state.tiles)
                clusters = findClusters(newTiles)
                if (clusters.length > 0){
                    newTiles = resolveOneCluster(newTiles, clusters)
                    solved = false
                }

                return {
                    tiles: newTiles,
                    solved: solved
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
