import { List } from 'immutable';

export const INITIAL_STATE = {
  x: 250,
  y: 113,
  columns: 8,
  rows: 8,
  tileWidth: 40,
  tileHeight: 40,
  tiles: List([]),
  solved: false
}
