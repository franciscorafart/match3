import { List } from 'immutable';

export const INITIAL_STATE = {
    x: 250,
    y: 113,
    columns: 8,
    rows: 8,
    tilewidth: 40,
    tileheight: 40,
    tiles: List([]),
    solved: false
}
