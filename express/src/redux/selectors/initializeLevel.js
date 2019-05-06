import { initLevel, createLevel } from './functions';

export default (state) => {
  let rowNum = 0;
  let colNum = 0;

  colNum = state.columns;
  rowNum = state.rows;

  let tiles = initLevel();
  tiles = createLevel(tiles);

  return tiles;
};
