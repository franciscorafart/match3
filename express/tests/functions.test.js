const {
    initializeLevel,
    availableMoves,
    findClusters,
    printableTiles,
    clickTile,
} = require('../resources/functions');

const {
    INITIAL_STATE,
    solvedTiles,
    unsolvedTiles,
    solvedTilesArray,
    solvedTilesAndSelected,
} = require('../constants');

//TODO: Why does it only work if I initialize first here?
let initializedLevel = initializeLevel(INITIAL_STATE);

test('Tests running', () => {
    expect(1+2).toBe(3);
});

test('IntializeLevel test', () => {

    // let initializedLevel = initializeLevel(INITIAL_STATE);
    expect(initializedLevel.size).not.toBe(0);
});

test('Test availableMoves solved tile', () => {
    let result = availableMoves(solvedTiles).solved;
    expect(result).toBe(true);
});

test('Test available moves unsolved tile', () => {
    let result = availableMoves(unsolvedTiles).solved;
    expect(result).toBe(false);;
});

test('Test solved tiles', () => {
    let result = findClusters(solvedTiles);
    expect(result.length).toBe(0);
});

test('Test unsolved tiles', () => {
    let result = findClusters(unsolvedTiles);
    expect(result.length).toBe(2);
});

test('Test printableTiles', () => {
    expect(printableTiles(solvedTiles)).toEqual(solvedTilesArray);
});

test('Click Tile test', () => {
    let result = clickTile(solvedTilesAndSelected, 0, 0, false)
    // TODO: is there a better way of evaluating the change,
    // Maybe testing the ones that should be equal
    expect(solvedTilesAndSelected).not.toEqual(result.newTiles)
    expect(result.solved).toBe(true)
})
