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
            // NOTE: Initialize with initialState instead of state so that setInterval(function () {
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
