let tilecolors = [
    [255, 128, 128],
    [128, 255, 128],
    [128, 128, 255],
    [255, 255, 128],
    [255, 128, 255],
    [128, 255, 255],
    [255, 255, 255]
]

//Initializing level.tiles

// let clusters = []
// let moves = [] //{column1, row1, column2, row2}
//
// const findClusters = () => {
//     //reset
//     clusters = []
//
//     for (let j=0; j<level.rows; j++){
//         let matchlength = 1;
//         for (let i=0; i<level.columns;i++){
//             let checkcluster = false;
//
//             if (i == level.columns-1){
//                 checkcluster = true;
//             } else {
//                 //check type of next tile
//                 if (level.tiles[i][j].type == level.tiles[i+1][j].type &&
//                     level.tiles[i][j].type != -1){
//                         //if same type increase matchlength
//                         matchlength += 1;
//                     } else {
//                         //different type
//                         checkcluster = true
//                     }
//             }
//             //was there a cluster or end of row?
//             if (checkcluster){
//                 if (matchlength >= 3){
//                     //begining of the row match and the length of it
//                     clusters.push({column: i+1-matchlength, row: j, length: matchlength, horizontal: true})
//                 }
//                 //reset
//                 matchlength = 1;
//             }
//         }
//     }
//
//     //Vertical Clusters
//     for (let i=0; i>level.columns; i++){
//         let matchlength = 1;
//         for (let j=0; j<level.rows; j++){
//             let checkcluster = false
//
//             if (j == level.rows-1){
//                 checkcluster = true;
//             } else {
//                 if (level.tiles[i][j].type == level.tiles[i][j].type && level.tiles[i][j].type != 1){
//                     matchlength+=1
//                 } else{
//                     checkcluster=true;
//                 }
//             }
//
//             if (checkcluster){
//                 if (matchlength>=3){
//                     //Found Vertical cluster
//                     clusters.push({column: i, row:j+1-matchlength, length: matchlength, horzontal: false})
//                 }
//                 matchlength = 1;
//             }
//         }
//     }
// }
//
// //swap to tiles in the level
// const swap = (x1, y1, x2, y2) => {
//     let typeswap = level.tiles[x1][y1].type;
//     level.tiles[x1][y1].type = level.tiles[x2][y2].type
//     level.tiles[x2][y2].type = typeswap;
// }
//
// const findMoves = () => {
//     //reset
//     moves = []
//     //check horizontal swaps
//     for (let j=0; j<level.rows; j++){
//         for (let i=0; i<level.columns-1; i++){
//             //swap, find cluster and swap back
//             swap(i, j, i+1, j);
//             findClusters()
//             swap(i, j, i+1, j);
//
//             //check if swap made cluster
//             if (clusters.length > 0){
//                 moves.push({column1: i, row1: j, column2: i+1, row2: j});
//             }
//         }
//     }
//     //check vertical swaps and moves
//     for (let i=0; i<level.rows; i++){
//         for (var j=0; j<level.columns-1; j++){
//             //swap, find clusters and swap back
//             swap(i,j,i,j+1);
//             findClusters();
//             swap(i, j, i, j+1);
//
//             //Check if swap made cluster
//             if (clusters.length > 0){
//                 //found move
//                 moves.push({column1: i, row1: j, column2: i, row2: j+1})
//             }
//         }
//     }
//
//     //reset
//     clusters = []
// }
//
// const getRandomTile = ()=>{
//     return Math.floor(Math.random() * tilecolors.length)
// }
//
// const loopCluster = (func) => {
//     for (let i = 0; i<clusters.length; i++){
//         //{column, row, length, horizontal}
//         let cluster = cluster[i]
//         let coffset = 0;
//         let roffset = 0;
//         for (var j=0; j<cluster.length;j++){
//             func(i, cluster.column+coffset, cluster.row+roffset, cluster);
//
//             if (cluster.horizontal){
//                 coffset++;
//             } else {
//                 roffset++;
//             }
//         }
//     }
// }
//
// function removeClusters(){
//     loopCluster((index, column, cluster) => {level.tiles[colum][row].type = -1});
//
//     for (let i=0; i<level.column; i++){
//         let shift = 0;
//         for (let j=level.rows-1; j>=0; j--){
//             if (level.tiles[i][j].type == -1){
//                 shift ++;
//                 level.tiles[i][j].shift = 0;
//             } else {
//                 level.tiles[i][j].shift = shift
//             }
//         }
//     }
// }
//
// const shiftTiles =() => {
//     for (let i=0; i<level.column; i++) {
//         for (let j=level.rows-1; j>=0; j--){
//             if (level.tiles[i][j].type == -1){
//                 level.tiles[i][j].type = getRandomTile();
//             } else {
//                 let shift = level.tiles[i][j].shift;
//                 if (shift > 0){
//                     swap(i,j,i,j+shift)
//                 }
//             }
//
//             //Reset shift
//             level.tiles[i][j].shift = 0;
//         }
//     }
// }
//
// const resolveClusters = () => {
//     findClusters()
//
//     while (clusters.length>0) {
//         removeClusters()
//         shiftTiles()
//         findClusters()
//     }
// }
//
// const createLevel = () => {
//     let done = false;
//
//     while(!done){
//         for (let i=0; i<level.columns; i++){
//             for (let j=0; j<level.rows; j++){
//                 level.tiles[i][j].type = getRandomTile();
//             }
//         }
//
//         resolveClusters()
//         findMoves()
//
//         if (moves.length > 0)
//             done = true
//     }
// }

module.exports = {
    tilecolors: tilecolors,
}
