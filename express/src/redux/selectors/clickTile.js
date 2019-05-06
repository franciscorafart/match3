import {
  isValidMove, swap, resolveClusters, resetAllSelected, countSelected
} from './functions';

const playMoves = (tiles) => {
  const secTls = [];
  const isValid = isValidMove(secTls[0][0],secTls[0][1],secTls[1][0],secTls[1][1],resolvedTiles);
  let resolvedTiles = tiles;
  let sequence = null;

  if (isValid) {
    resolvedTiles = swap(
      secTls[0][0],
      secTls[0][1],
      secTls[1][0],
      secTls[1][1],
      resolvedTiles
    );

    let result = resolveClusters(resolvedTiles);
    // let { resolvedTiles, sequence } = resolveClusters(resolvedTiles)
    sequence = result.sequence;
    resolvedTiles = result.resolvedTiles;
  };

  //reset all selected if valid or not valid
  resolvedTiles = resetAllSelected(resolvedTiles);

  return { resolvedTiles: resolvedTiles, sequence: sequence};
};

const addSelected = (col, row, addBool, tiles) => {
  let locTiles = tiles;
  let sequence = null;

  locTiles = locTiles.setIn([col,row,'selected'],addBool);

  if (countSelected(locTiles) === 2) {
    let result = playMoves(locTiles);
    // let { resolvedTiles, sequence } = playMoves(locTiles)
    locTiles = result.resolvedTiles;
    sequence = result.sequence;
  };

  return { newTiles: locTiles, sequence: sequence };
};

export default (tiles, col, row, selectedPrevious) => {
  const solved = true;
  let result = null;
  // let newTiles = null

  if (!selectedPrevious) result = addSelected(col, row, true, tiles);
  else result = addSelected(col, row, false, tiles);

  const newTiles = result.newTiles;
  const sequence = result.sequence;
  // let clusters = findClusters(newTiles)
  // if (clusters.length>0)
  //     solved=false

  return {
    newTiles,
    solved,
    sequence
  };
};
