const { initializeLevel, availableMoves, findClusters } = require('../resources/functions')
const { INITIAL_STATE, solvedTiles, unsolvedTiles } = require('../constants');


//TODO: Why does it only work if I initialize first?
initializeLevel(INITIAL_STATE)

test('Tests running', () => {
    expect(1+2).toBe(3);
});

//TODO: Expect it to be a tile grid. Test types?
// test('IntializeLevel test', () => {
//     expect()
// })

test('Test availableMoves solved tile', () => {
    let result = availableMoves(solvedTiles).solved
    expect(result).toBe(true)
})

test('Test available moves unsolved tile', ()=> {
    let result = availableMoves(unsolvedTiles).solved
    expect(result).toBe(false)
})

test('Test solved tiles', ()=> {
    let result = findClusters(solvedTiles);
    expect(result.length).toBe(0)
})

test('Test unsolved tiles', ()=> {
    let result = findClusters(unsolvedTiles);
    expect(result.length).toBe(2)
})
