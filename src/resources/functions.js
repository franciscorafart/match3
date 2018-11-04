import {List, Map} from 'immutable';

//Selected tiles as global for the moment
let secTls = []

export const tilecolors = [
    [255, 128, 128],
    [128, 255, 128],
    [128, 128, 255],
    [255, 255, 128],
    [255, 128, 255],
    [128, 255, 255],
    [255, 255, 255]
]

const getRandomTile = () => {
    return Math.floor(Math.random() * tilecolors.length)
}

const initLevel = (state) => {
    let tiles = List([])

    for (let i=0; i<state.columns;i++){
        tiles = tiles.set(i, List([]))
        for (let j=0; j<state.rows; j++){
            tiles = tiles.setIn([i,j], Map({type: 0, shifter: 0, selected:false}))
        }
    }

    return tiles
}

const createLevel = (tiles, state) => {
    let done = false;
    let locTiles = tiles
    let countCreateLevel = 0

    while(!done){
        locTiles = tiles

        for (let i=0; i<state.columns;i++){
            for (let j=0; j<state.rows; j++){
                locTiles = locTiles.setIn([i,j,'type'], getRandomTile())
            }
        }
        locTiles = resolveClusters(locTiles, state)
        let moves = findMoves(locTiles, state)

        if (moves.length > 0){
            done = true
        }
        countCreateLevel++
    }

    return locTiles
}

//TODO: Move this into initGame
export const initializeLevel = (state) => {
    let tiles = initLevel(state)
    tiles = createLevel(tiles, state)

    //Set state in redux way
    // this.setState({tiles: tiles})
    return tiles
}

export const getMyColor = (x,y,tiles) => {
    let type = tiles.getIn([x,y,'type'])
    let color = tilecolors[type]

    return color
}

const resolveClusters = (tiles, state) => {
    let locTiles = tiles
    let clusters = findClusters(locTiles, state)

    let count = 0

    while (clusters.length>0){
        locTiles = removeClusters(locTiles, clusters, state)
        locTiles = shiftTiles(locTiles, state)
        clusters = findClusters(locTiles, state)
        count+=1
    }

    return locTiles
}

const findClusters = (tiles, state) => {
    //reset
    let clusters = []

    for (let j=0; j<state.rows; j++){
        let matchlength = 1;
        for (let i=0; i<state.columns;i++){
            let checkcluster = false;

            if (i == state.columns-1){
                checkcluster = true;
            } else {
                //check type of next tile
                if (tiles.getIn([i,j,'type']) == tiles.getIn([i+1,j,'type']) && tiles.getIn([i, j, 'type'])!= -1){
                        //if same type increase matchlength
                        matchlength += 1;
                    } else {
                        //different type
                        checkcluster = true
                    }
            }
            if (checkcluster){
                if (matchlength >= 3){
                    //begining of the row match and the length of it
                    clusters.push({column: i+1-matchlength, row: j, length: matchlength, horizontal: true})
                }
                //reset
                matchlength = 1;
            }
        }
    }

    //Vertical Clusters
    for (let i=0; i<state.columns; i++){
        let matchlength = 1;
        for (let j=0; j<state.rows; j++){
            let checkcluster = false

            if (j == state.rows-1){
                checkcluster = true;
            } else {
                if (tiles.getIn([i,j,'type']) == tiles.getIn([i,j+1,'type']) && tiles.getIn([i,j,'type']) != -1){
                    matchlength+=1;
                } else{
                    checkcluster=true;
                }
            }

            if (checkcluster){
                if (matchlength>=3){
                    //Found Vertical cluster
                    clusters.push({column: i, row:j+1-matchlength, length: matchlength, horizontal: false})
                }
                matchlength = 1;
            }
        }
    }

    return clusters
}

const removeClusters = (tiles, cluster, state) => {
    let locTiles = tiles
    //Loop tiles and set to type -1 ones that are in a cluster
    for (let z=0;z<cluster.length; z++){
        let c = cluster[z]
        if (c.horizontal == true){
            let y = c.row
            for (let x=c.column; x<c.column+c.length; x++){
                locTiles = locTiles.setIn([x,y,'type'], -1)
            }
        } else {
            let x = c.column
            for (let y=c.row; y<c.row+c.length; y++){
                locTiles = locTiles.setIn([x,y,'type'], -1)
            }
        }
    }

    //Remove Clusters
    for (let i=0; i<state.columns; i++){
        let shift = 0;
        for (let j=state.rows-1; j>=0; j--){
            if (locTiles.getIn([i,j,'type']) == -1){
                shift ++;
                locTiles = locTiles.setIn([i,j, 'shifter'], 0)
            } else {
                locTiles = locTiles.setIn([i,j, 'shifter'], shift)
            }
        }
    }

    return locTiles
}

const shiftTiles = (tiles, state) => {

    let locTiles = tiles

    for (let i=0; i<state.columns; i++) {
        for (let j=state.rows-1; j>=0; j--){
            if (locTiles.getIn([i,j,'type']) == -1){
                locTiles = locTiles.setIn([i,j,'type'], getRandomTile())
            } else {
                let shift = locTiles.getIn([i,j,'shifter'])
                if (shift > 0){
                    locTiles = swap(i,j,i,j+shift, locTiles)
                }
            }

            //Reset shift
            locTiles = locTiles.setIn([i,j,'shifter'], 0)
        }
    }
    return locTiles
}

//swap to tiles in the level
const swap = (x1, y1, x2, y2, tiles) => {
    let tilescp = tiles
    let typeswap = tilescp.getIn([x1, y1, 'type']);

    let tilecp2Type = tilescp.getIn([x2, y2, 'type']);

    tilescp = tilescp.setIn([x1,y1,'type'], tilecp2Type);

    tilescp = tilescp.setIn([x2,y2,'type'], typeswap);

    return tilescp
}

const findMoves = (tiles, state) => {
    let locTiles = tiles

    let moves = []
    let clusters = []
    //check horizontal swaps
    for (let j=0; j<state.rows; j++){
        for (let i=0; i<state.columns-1; i++){
            //swap, find cluster and swap back
            locTiles = swap(i, j, i+1, j, locTiles);
            clusters = findClusters(locTiles, state)
            locTiles = swap(i, j, i+1, j, locTiles);

            //check if swap made cluster
            if (clusters.length > 0){
                moves.push({column1: i, row1: j, column2: i+1, row2: j});
            }
        }
    }

    //check vertical swaps and moves
    for (let i=0; i<state.columns; i++){
        for (var j=0; j<state.rows-1; j++){
            //swap, find clusters and swap back
            locTiles = swap(i,j,i,j+1, locTiles);
            clusters = findClusters(locTiles, state);
            locTiles = swap(i, j, i, j+1, locTiles);

            //Check if swap made cluster
            if (clusters.length > 0){
                moves.push({column1: i, row1: j, column2: i, row2: j+1})
            }
        }
    }
    return moves
}

export const addSelected = (col, row, addBool, state) => {

    let locTiles = state.tiles

    locTiles = locTiles.setIn([col,row,'selected'],addBool)

    if (countSelected(locTiles, state) === 2){
        locTiles = playMove(locTiles, state)
    }
    // else {
    //
    //     //TODO: modify set State for redux function
    //     // this.setState({tiles: locTiles})
    // }

    return locTiles
}

const playMove = (tiles, state) => {
    let resolvedTiles = tiles;
        let isValidMove = isValidMove(
            secTls[0][0],
            secTls[0][1],
            secTls[1][0],
            secTls[1][1],
            resolvedTiles,
            state
            )
        if (isValidMove){
            resolvedTiles = swap(
                secTls[0][0],
                secTls[0][1],
                secTls[1][0],
                secTls[1][1],
                resolvedTiles
            )
            resolvedTiles = resolveClusters(resolvedTiles, state)
        }

        //reset all selected if valid or not valid
        resolvedTiles = resetAllSelected(resolvedTiles, state)

        //TODO: change for redux way of changing state
        // setTimeout(this.setState({tiles: resolvedTiles}), 500)

}

const isValidMove = (c1,r1,c2,r2, tiles, state) => {
    let locTiles = tiles
    let moves = findMoves(locTiles, state)
    let valid = false

    for (let move of moves){
        if (move.column1 === c1 && move.column2 === c2 && move.row1 === r1 && move.row2 === r2){
            valid = true
            break;
        }
    }
    return valid
}

const countSelected = (tiles, state) => {
    let locTiles = tiles
    secTls = []
    let count = 0
    for (let y=0;y<state.rows; y++){
        for (let x=0; x<state.columns; x++){
            if(locTiles.getIn([x, y, 'selected'])){
                secTls.push([x,y])
                count++
            }
        }
    }
    return count
}

const resetAllSelected = (tiles, state) => {
    let locTiles = tiles
    for (let y=0;y<state.rows; y++){
        for (let x=0; x<state.columns; x++){
            locTiles = locTiles.setIn([x,y,'selected'], false)
        }
    }
    secTls = []

    return locTiles
}

export const printableTiles = (mess, tiles) => {
    let result = []
    for (let row of tiles.toArray()){
        let localVar = []
        for (let tile of row.toArray()){
            localVar.push(tile.toObject().type)
        }
        result.push(localVar)
    }
    return result
}

// module.exports = {
//     tilecolors: tilecolors,
//     getMyColor: getMyColor,
//     initializeLevel: initializeLevel
// }
