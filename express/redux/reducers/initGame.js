const { INIT_GAME, CLICK_TILE, AVAILABLE_MOVES} = require('../actionTypes');
const { INITIAL_STATE } = require('../../constants');
const {
    initializeLevel, clickTile, availableMoves
} = require('../../resources/functions');

const initialState =  INITIAL_STATE;

//NOTE: reducers change state based on what the action tells it to do
const initGame = (state = initialState, action) => {
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
            let selectedPrevious = content.selected;

            let { newTiles, solved } = clickTile(state.tiles, content.col, content.row, selectedPrevious)

            return {
                tiles: newTiles,
                solved: solved
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

module.exports = initGame
