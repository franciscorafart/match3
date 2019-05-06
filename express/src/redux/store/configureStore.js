import { createStore, combineReducers } from 'redux';
import initGame from '../reducers/initGame';

export default () => {
  const store = createStore(
    combineReducers({
      initGame
    })
  );
  return store;
}
