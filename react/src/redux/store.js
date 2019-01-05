import { createStore , applyMiddleware} from 'redux';
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import {
    watchInitializeLevel,
    watchClickTile
} from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

//Action watcher
sagaMiddleware.run(watchInitializeLevel)
sagaMiddleware.run(watchClickTile)
//TODO: add click_tile and others
