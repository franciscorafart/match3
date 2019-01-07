import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { initGame, clickTile } from './actions'

export function* watchInitializeLevel() {
    yield takeEvery('INIT_GAME_ACTION', initializeLevelAsync);
}

export function* watchClickTile() {
    console.log('CLICK_TILE_ACTION')
    yield takeEvery('CLICK_TILE_ACTION', clickTileAsync)
}

function* initializeLevelAsync() {
    try {
        const data = yield call(() => {
            return fetch('/initializeLevel',{
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({})
            }).then(res => res.json())
        });

        //NOTE: The user action from the actual process must be separated
        //so that there's no loop

        //TODO: transform sent array into list
        yield put(initGame(data.initGame))

    } catch (error) {
        console.log('Error initializeLevelAsync')
    }
}

function* clickTileAsync(payload) {
    console.log('clickTileAsync payload: ', payload)
    try {
        const selectedPrevious = payload.selected
        const data = yield call(()=> {
            return fetch('/clickTile',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    col: payload.col,
                    row: payload.row,
                    selected: selectedPrevious
                })
            }).then(res => res.json())
        });
        console.log('data in clickTileAsync', data)
        yield put(clickTile(data.initGame))
    } catch {
        console.log('Error clickTileAsync')
    }
}
