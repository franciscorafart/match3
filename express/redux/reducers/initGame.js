const { INIT_GAME, CLICK_TILE } = require('../actionTypes');
const { INITIAL_STATE } = require('../../constants');
const {
    initializeLevel, clickTile, availableMoves, printableTiles, initGame
} = require('../../resources/functions');

const initialState =  INITIAL_STATE;

//NOTE: reducers change state based on what the action tells it to do
const initGame = (state = initialState, action) => {
    switch (action.type) {
        case INIT_GAME: {
            // NOTE: Initialize with initialState instead of 'state' so that game
            // can be reinitialized without restarting server
            let newTiles = initializeLevel(initialState)

            return {
                ...state,
                tiles: newTiles,
                solved: true
            }
        }

        case CLICK_TILE: {
            const content = action.payload;
            console.log('content: ', content)
            let { newTiles, solved, sequence } = clickTile(state.tiles, content.col, content.row, content.selected)

            return {
                tiles: newTiles,
                solved: solved,
                sequence: sequence
            }
        }

        default: {
            return state;
        }
    }
}

module.exports = initGame
