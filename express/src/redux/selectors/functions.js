import { List, Map } from 'immutable';

//Selected tiles as global for the moment
const secTls = [];
let rowNum = 0;
let colNum = 0;

const red = [255, 128, 128];
const green = [128, 255, 128];
const purple = [128, 128, 255];
const yellow = [255, 255, 128];
const pink = [255, 128, 255];
const blue = [128, 255, 255];
const white = [255, 255, 255];

const tileColors = [
  red,
  green,
  purple,
  yellow,
  pink,
  blue,
  white
];

const getRandomTile = () => {
  return Math.floor(Math.random() * tileColors.length);
};

const range = (x, i) => {
  const range = [...Array(x).keys()];

  if(i === -1) return range.reverse();
  return [...Array(x).keys()];
};

const removeClusters = (tiles, cluster) => {
  let locTiles = tiles;
  //Loop tiles and set to type -1 ones that are in a cluster
  for (let z of range(cluster.length)) {
    const c = cluster[z];

    if (c.horizontal === true) {
      let y = c.row;

      for (let x = c.column; x < c.column + c.length; x++){
        locTiles = locTiles.setIn([x, y, 'type'], -1);
      };
    } else {
      let x = c.column;

      for (let y = c.row; y < c.row + c.length; y++) {
        locTiles = locTiles.setIn([x, y, 'type'], -1);
      };
    };
  };

  //Remove Clusters
  for (let i of range(colNum)) {
    let shift = 0;

    for (let j of range(rowNum, -1)) {
      if (locTiles.getIn([i, j, 'type']) === -1) {
        shift ++;
        locTiles = locTiles.setIn([i,j, 'shifter'], 0)
      } else {
        locTiles = locTiles.setIn([i,j, 'shifter'], shift);
      };
    };
  };
  return locTiles;
}

const findMoves = (tiles) => {
  let locTiles = tiles;

  const moves = [];
  let clusters = [];
  //check horizontal swaps
  for (let j of range(rowNum)) {
    for (let i of range(colNum)) {
      //swap, find cluster and swap back
      locTiles = swap(i, j, i + 1, j, locTiles);
      clusters = findClusters(locTiles);
      locTiles = swap(i, j, i + 1, j, locTiles);

      //check if swap made cluster
      if (clusters.length > 0) {
        moves.push({ column1: i, row1: j, column2: i + 1, row2: j });
      };
    }
  }

  //check vertical swaps and moves
  for (let i of range(colNum)) {
    for (let j of range(rowNum)) {
      //swap, find clusters and swap back
      locTiles = swap(i, j, i, j + 1, locTiles);
      clusters = findClusters(locTiles);
      locTiles = swap(i, j, i, j + 1, locTiles);

      //Check if swap made cluster
      if (clusters.length > 0) {
        moves.push({ column1: i, row1: j, column2: i, row2: j +1 });
      };
    }
  }
  return moves;
};

const addSelectedOneMove = (col, row, addBool, tiles) => {
  //TODO: Make sure that it is working fine
  let locTiles = List(tiles);
  locTiles = locTiles.setIn([col, row, 'selected'], addBool);

  if (countSelected(locTiles) === 2) {
    locTiles = playOneMove(locTiles);
  };

  return locTiles;
};

const playOneMove = (tiles) => {
  let resolvedTiles = tiles;
  //TODO: problem with selTls when is middle move
  let isValid = isValidMove(secTls[0][0],secTls[0][1],secTls[1][0],secTls[1][1],resolvedTiles);

  if (isValid) {
    resolvedTiles = swap(
        secTls[0][0],
        secTls[0][1],
        secTls[1][0],
        secTls[1][1],
        resolvedTiles
    );

    resolvedTiles = resolveOneCluster(resolvedTiles);
  };

  resolvedTiles = resetAllSelected(resolvedTiles);

  return resolvedTiles;
}

export const countSelected = (tiles) => {
  const locTiles = tiles;
  let count = 0;

  for (let y of range(rowNum)) {
    for (let x of range(colNum)) {
      if(locTiles.getIn([x, y, 'selected'])) {
        secTls.push([x,y]);
        count++;
      };
    }
  }
  return count;
}

export const resetAllSelected = (tiles) => {
  let locTiles = tiles;

  for (let y of range(rowNum)) {
    for (let x of range(colNum)) {
      locTiles = locTiles.setIn([x,y,'selected'], false);
    }
  }
  secTls = [];

  return locTiles;
}

export const initLevel = () => {
  let tiles = List([]);

  for (let i of range(colNum)) {
    tiles = tiles.set(i, List([]));
    for (let j of range(rowNum)) {
      tiles = tiles.setIn([i,j], Map({ type: 0, shifter: 0, selected:false }));
    }
  }
  return tiles;
};

export const createLevel = (tiles) => {
  let done = false;
  let locTiles = tiles;

  // let resolvedTiles = null;
  // let sequence = []
  while(!done){
    locTiles = tiles;
    let sequence = null;

    for (let i of range(colNum)) {
      for (let j of range(rowNum)) {
        locTiles = locTiles.setIn([i,j,'type'], getRandomTile());
      };
    };

    let result = resolveClusters(locTiles);
    // let { resolvedTiles, sequence } = resolveClusters(locTiles)

    locTiles = result.resolvedTiles;
    sequence = result.sequence;
    const moves = findMoves(locTiles);

    if (moves.length > 0) {
      done = true;
    };
  };
  return locTiles;
};

export const isValidMove = (c1,r1,c2,r2, tiles) => {
  const locTiles = tiles;
  const moves = findMoves(locTiles);
  let valid = false;

  for (let move of moves) {
    if (move.column1 === c1 && move.column2 === c2 && move.row1 === r1 && move.row2 === r2) {
      valid = true;
      break;
    };
  }
  return valid;
}

//swap to tiles in the level
export const swap = (x1, y1, x2, y2, tiles) => {
  const typeswap = tilescp.getIn([x1, y1, 'type']);
  let tilecp2Type = tilescp.getIn([x2, y2, 'type']);
  let tilescp = tiles;

  tilescp = tilescp.setIn([x1,y1,'type'], tilecp2Type);
  tilescp = tilescp.setIn([x2,y2,'type'], typeswap);

  return tilescp;
}

export const resolveClusters = (tiles) => {
  let locTiles = tiles;
  const clusters = findClusters(locTiles);
  const sequence = [];

  while (clusters.length > 0) {
    sequence.unshift(locTiles);

    locTiles = removeClusters(locTiles, clusters);
    locTiles = shiftTiles(locTiles);
    clusters;
  };
  //TODO: return the sequence as well
  return { resolvedTiles: locTiles, sequence: sequence };
};

export const resolveOneCluster = (tiles) => {
  let locTiles = tiles;
  const clusters = findClusters(locTiles);

  if (clusters.length >= 0) locTiles = removeClusters(locTiles, clusters);

  return locTiles;
};

export const findClusters = (tiles) => {
  //reset
  const clusters = [];

  for (let j of range(rowNum)) {
    let matchlength = 1;

    for (let i of range(colNum)) {
      let checkcluster = false;

      if (i === colNum - 1) {
        checkcluster = true;
      } else {
        //check type of next tile
        // if (tiles.getIn([i,j,'type']) === tiles.getIn([i+1,j,'type']) && tiles.getIn([i, j, 'type'])!== -1){
        if (tiles.getIn([i, j, 'type']) === tiles.getIn([i + 1, j, 'type'])) {
          //if same type increase matchlength
          matchlength += 1;
        } else {
          //different type
          checkcluster = true;
        };
      };

      if (checkcluster) {
        if (matchlength >= 3) {
          //begining of the row match and the length of it
          clusters.push({ column: i + 1- matchlength, row: j, length: matchlength, horizontal: true });
        };
        //reset
        matchlength = 1;
      };
    }
  };

  //Vertical Clusters
  for (let i of range(colNum)) {
    let matchlength = 1;

    for (let j of range(rowNum)) {
      let checkcluster = false;

      if (j === rowNum - 1) {
        checkcluster = true;
      } else {
        // if (tiles.getIn([i,j,'type']) === tiles.getIn([i,j+1,'type']) && tiles.getIn([i,j,'type']) !== -1){
          if (tiles.getIn([i, j, 'type']) === tiles.getIn([i, j + 1, 'type'])) {
          matchlength += 1;
        } else {
          checkcluster = true;
        };
      };

      if (checkcluster) {
        if (matchlength >= 3) {
          //Found Vertical cluster
          clusters.push({ column: i, row: j + 1 - matchlength, length: matchlength, horizontal: false });
        };
        matchlength = 1;
      };
    }
  };
  return clusters;
}

export const shiftTiles = (tiles) => {
  let locTiles = tiles;

  for (let i of range(colNum)) {
    for (let j of range(rowNum, -1)) {
      if (locTiles.getIn([i, j, 'type']) === -1) {
        locTiles = locTiles.setIn([i,j,'type'], getRandomTile());
      } else {
        const shift = locTiles.getIn([i,j,'shifter']);

        if (shift > 0){
          locTiles = swap(i,j,i,j+shift, locTiles);
        };
      };
      //Reset shift
      locTiles = locTiles.setIn([i,j,'shifter'], 0);
    }
  }
  return locTiles;
}
