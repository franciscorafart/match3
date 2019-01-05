import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

export function* watchInitializeLevel() {
    yield takeEvery('INIT_GAME', initializeLevelAsync);
}

function* initializeLevelAsync() {
    try {
        const data = yield call(() => {
            return fetch('/initializeLevel',{
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({})
            }).then(res => {
                res.json().then( dat => {
                    console.log('data in saga.js: ', dat.initGame)
                    return dat.initGame
                })
            })
        });

        //The user action from the actual process must be separated
        //so that there's no loop
        yield put({ type: 'INIT_GAME' });
    } catch (error) {
        console.log('Error initializeLevelAsync in sagas.js')
    }

}
