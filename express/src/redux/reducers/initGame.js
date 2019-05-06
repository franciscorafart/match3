import { INITIAL_STATE } from '../../constants';
import clickTile from '../selectors/clickTile';
import printableTiles from '../selectors/printableTiles';
import initializeLevel from '../selectors/initializeLevel';

const initialState = INITIAL_STATE;

//NOTE: reducers change state based on what the action tells it to do
export default (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_GAME': {
      // NOTE: Initialize with initialState instead of 'state' so that game
      // can be reinitialized without restarting server
      let newTiles = initializeLevel(initialState)
      return {
        ...state,
        tiles: newTiles,
        solved: true
      }
    }
    case 'CLICK_TILE': {
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
};
