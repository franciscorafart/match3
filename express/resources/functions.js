let {List, Map} = require('immutable');

//Selected tiles as global for the moment
let secTls = []
let rownum = 0
let colnum = 0

const tilecolors = [
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

const range = (x, i) =>{
    let range = [...Array(x).keys()]

    if(i === -1)
        return range.reverse()

    return [...Array(x).keys()]
}

const initLevel = () => {

    let tiles = List([])

    for (let i of range(colnum)){
        tiles = tiles.set(i, List([]))
        for (let j of range(rownum)){
            tiles = tiles.setIn([i,j], Map({type: 0, shifter: 0, selected:false}))
        }
    }

    return tiles
}

    const createLevel = (tiles) => {
    let done = false;
    let locTiles = tiles

    while(!done){
        locTiles = tiles

        for (let i of range(colnum)){
            for (let j of range(rownum)){
                locTiles = locTiles.setIn([i,j,'type'], getRandomTile())
            }
        }

        locTiles = resolveClusters(locTiles)
        let moves = findMoves(locTiles)

        if (moves.length > 0){
            done = true
        }
    }

    return locTiles
}

const initializeLevel = (state) => {
    colnum = state.columns
    rownum = state.rows

    let tiles = initLevel()
    tiles = createLevel(tiles)

    return tiles
}

// export const getMyColor = (x,y,tiles) => {
//     let type = tiles.getIn([x,y,'type'])
//
//     //Empty one (black)
//     if (type === -1)
//         return [0,0,0]
//
//     let color = tilecolors[type]
//
//     return color
// }

const resolveClusters = (tiles) => {
    let locTiles = tiles
    let clusters = findClusters(locTiles)

    while (clusters.length>0){
        locTiles = removeClusters(locTiles, clusters)
        locTiles = shiftTiles(locTiles)
        clusters = findClusters(locTiles)
    }

    return locTiles
}

const resolveOneCluster = (tiles) => {
    let locTiles = tiles
    let clusters = findClusters(locTiles)
    console.log('clusters length in resolveOneCluster: ', clusters.length)

    if (clusters.length >= 0)
        locTiles = removeClusters(locTiles, clusters)

    return locTiles
}

const findClusters = (tiles) => {
    //reset
    let clusters = []

    for (let j of range(rownum)){
        let matchlength = 1;
        for (let i of range(colnum)){
            let checkcluster = false;

            if (i === colnum-1){
                checkcluster = true;
            } else {
                //check type of next tile
                // if (tiles.getIn([i,j,'type']) === tiles.getIn([i+1,j,'type']) && tiles.getIn([i, j, 'type'])!== -1){
                    if (tiles.getIn([i,j,'type']) === tiles.getIn([i+1,j,'type'])){
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
    for (let i of range(colnum)){
        let matchlength = 1;
        for (let j of range(rownum)){
            let checkcluster = false

            if (j === rownum-1){
                checkcluster = true;
            } else {
                // if (tiles.getIn([i,j,'type']) === tiles.getIn([i,j+1,'type']) && tiles.getIn([i,j,'type']) !== -1){
                    if (tiles.getIn([i,j,'type']) === tiles.getIn([i,j+1,'type'])){
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

const removeClusters = (tiles, cluster) => {
    let locTiles = tiles
    //Loop tiles and set to type -1 ones that are in a cluster
    for (let z of range(cluster.length)){
        let c = cluster[z]
        if (c.horizontal === true){
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
    for (let i of range(colnum)){
        let shift = 0;
        for (let j of range(rownum,-1)){
            if (locTiles.getIn([i,j,'type']) === -1){
                shift ++;
                locTiles = locTiles.setIn([i,j, 'shifter'], 0)
            } else {
                locTiles = locTiles.setIn([i,j, 'shifter'], shift)
            }
        }
    }

    return locTiles
}

const shiftTiles = (tiles) => {

    let locTiles = tiles
    for (let i of range(colnum)){
        for (let j of range(rownum,-1)){
            if (locTiles.getIn([i,j,'type']) === -1){
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

const findMoves = (tiles) => {
    let locTiles = tiles

    let moves = []
    let clusters = []
    //check horizontal swaps
    for (let j of range(rownum)){
        for (let i of range(colnum)){
            //swap, find cluster and swap back
            locTiles = swap(i, j, i+1, j, locTiles);
            clusters = findClusters(locTiles)
            locTiles = swap(i, j, i+1, j, locTiles);

            //check if swap made cluster
            if (clusters.length > 0){
                moves.push({column1: i, row1: j, column2: i+1, row2: j});
            }
        }
    }

    //check vertical swaps and moves
    for (let i of range(colnum)){
        for (let j of range(rownum)){
            //swap, find clusters and swap back
            locTiles = swap(i,j,i,j+1, locTiles);
            clusters = findClusters(locTiles);
            locTiles = swap(i, j, i, j+1, locTiles);

            //Check if swap made cluster
            if (clusters.length > 0){
                moves.push({column1: i, row1: j, column2: i, row2: j+1})
            }
        }
    }
    return moves
}

const addSelected = (col, row, addBool, tiles) => {

    let locTiles = tiles
    locTiles = locTiles.setIn([col,row,'selected'],addBool)

    if (countSelected(locTiles) === 2){
        locTiles = playMoves(locTiles)
    }

    return locTiles
}

const addSelectedOneMove = (col, row, addBool, tiles) => {

    let locTiles = tiles
    locTiles = locTiles.setIn([col,row,'selected'],addBool)

    if (countSelected(locTiles) === 2){
        locTiles = playOneMove(locTiles)
    }

    return locTiles
}

const isValidMove = (c1,r1,c2,r2, tiles) => {
    let locTiles = tiles
    let moves = findMoves(locTiles)
    let valid = false

    for (let move of moves){
        if (move.column1 === c1 && move.column2 === c2 && move.row1 === r1 && move.row2 === r2){
            valid = true
            break;
        }
    }
    return valid
}

const playMoves = (tiles) => {
    let resolvedTiles = tiles;
    let isValid = isValidMove(secTls[0][0],secTls[0][1],secTls[1][0],secTls[1][1],resolvedTiles)

        if (isValid){
            resolvedTiles = swap(
                secTls[0][0],
                secTls[0][1],
                secTls[1][0],
                secTls[1][1],
                resolvedTiles
            )
            resolvedTiles = resolveClusters(resolvedTiles)
        }

        //reset all selected if valid or not valid
        resolvedTiles = resetAllSelected(resolvedTiles)

    return resolvedTiles
}

const playOneMove = (tiles) => {
    let resolvedTiles = tiles;
    //TODO: problem with selTls when is middle move
    let isValid = isValidMove(secTls[0][0],secTls[0][1],secTls[1][0],secTls[1][1],resolvedTiles)

    if (isValid){
        resolvedTiles = swap(
            secTls[0][0],
            secTls[0][1],
            secTls[1][0],
            secTls[1][1],
            resolvedTiles
        )

    resolvedTiles = resolveOneCluster(resolvedTiles)
    }

    resolvedTiles = resetAllSelected(resolvedTiles)

    return resolvedTiles
}

const countSelected = (tiles) => {
    let locTiles = tiles
    secTls = []
    let count = 0
    for (let y of range(rownum)){
        for (let x of range(colnum)){
            if(locTiles.getIn([x, y, 'selected'])){
                secTls.push([x,y])
                count++
            }
        }
    }
    return count
}

const resetAllSelected = (tiles) => {
    let locTiles = tiles
    for (let y of range(rownum)){
        for (let x of range(colnum)){
            locTiles = locTiles.setIn([x,y,'selected'], false)
        }
    }
    secTls = []

    return locTiles
}

const printableTiles = (mess, tiles) => {
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

const clickTile = (tiles, col, row, selectedPrevious) => {
    let solved = true
    let newTiles = null
    if (!selectedPrevious)
        newTiles = addSelectedOneMove(col, row, true, tiles)
    else
        newTiles = addSelectedOneMove(col, row, false, tiles)

    let clusters = findClusters(newTiles)
    if (clusters.length>0)
        solved=false

    return {
        newTiles: newTiles,
        solved: solved
    }
}

const availableMoves = (tiles) => {
    let clusters = findClusters(tiles);
    let solved = true;

    if (clusters.length > 0){
        let newTiles = shiftTiles(tiles);
        clusters = findClusters(newTiles);
        if (clusters.length > 0){
            newTiles = resolveOneCluster(newTiles, clusters);
            solved = false
        }

        return {
            newTiles: newTiles,
            solved: solved
        }
    }
    return {tiles: tiles}
}

module.exports = {
    clickTile: clickTile,
    availableMoves: availableMoves,
    printableTiles: printableTiles,
    initializeLevel: initializeLevel
}
