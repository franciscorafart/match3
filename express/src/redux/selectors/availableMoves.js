import { findClusters, shiftTiles, resolveOneCluster } from './functions';

export default (tiles) => {
  let clusters = findClusters(tiles);
  let solved = true;

  if (clusters.length > 0) {
    let newTiles = shiftTiles(tiles);
    clusters = findClusters(newTiles);

    if (clusters.length > 0){
      newTiles = resolveOneCluster(newTiles, clusters);
      solved = false;
    };

    return {
      newTiles: newTiles,
      solved: solved
    };
  };

  return {
    tiles: tiles,
    solved: solved
  };
};
