const express = require('express');
let bodyParser = require('body-parser');
let { clickTile, initializeLevel } = require('./resources/functions');
const redux = require('redux');
const app = express();
let store = require('./redux/store');

let db;

app.listen(process.env.port || 8000, () => {
    console.log('Runing on port 8000');
});

app.use(bodyParser.json())

app.post('/clickTile', (req, res) => {

    let payload = req.body

    store.dispatch({type: 'CLICK_TILE', payload: payload})

    let state = store.getState()
    let response = JSON.stringify(state)
    res.send(response)
})

app.post('/initializeLevel', (req, res) => {

    store.dispatch({type:'INIT_GAME'})

    let state = store.getState()
    let response = JSON.stringify(state)
    res.send(response)
})

//Function that subscribes to state change
// const unsubscribe = store.subscribe(() => console.log('state changed: ',store.getState()))
