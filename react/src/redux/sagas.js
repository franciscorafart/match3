import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { initGame, clickTile } from './actions'

export function* watchInitializeLevel() {
    yield takeEvery('INIT_GAME_ACTION', initializeLevelAsync);
}

export function* watchClickTile() {
    // console.log('CLICK_TILE_ACTION')
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

        yield put(initGame(data.initGame))

    } catch (error) {
        console.log('Error initializeLevelAsync')
    }
}

function* clickTileAsync(payload) {
    const selectedPrevious = payload.payload.selected
    let object = {
        col: payload.payload.col,
        row: payload.payload.row,
        selected: selectedPrevious
    }
    let body = JSON.stringify(object)

    let fetchData = async () => {
        const response = await fetch('/clickTile',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: body
        })
        const data = await response.json()
        return data
    }

    try {
        const data = yield call(fetchData)
        yield put(clickTile(data.initGame))
    } catch (e){
        console.log('Error clickTileAsync: ', e)
    }
}
