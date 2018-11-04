// import {List, Map} from 'immutable';

import { createStore } from 'redux';
import rootReducer from './reducers'

// let store = {
//     x: 250,
//     y: 113,
//     columns: 8,
//     rows: 8,
//     tilewidth: 40,
//     tileheight: 40,
//     tiles: List([]),
// }

// module.exports = {
//     store: store
// }

export default createStore(rootReducer);
