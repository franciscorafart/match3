import { createStore , applyMiddleware} from 'redux';
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import { watchInitializeLevel } from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

//NOTE: Does this go here?
sagaMiddleware.run(watchInitializeLevel)
// const action = type => store.dispatch({type})
