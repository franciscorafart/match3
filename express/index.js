const express = require('express');
const bodyParser = require('body-parser');
let { availableMoves, clickTile, initializeLevel } = require('./resources/functions');
const redux = require('redux');
const app = express();
let store = require('./redux/store');

let db;
//TODO: connect to db

app.listen(process.env.port || 8000, () => {
    console.log('Runing on port 8000');
});

app.use(bodyParser.json())
// app.use(express.bodyParser())

app.post('/clickTile', (req, res) => {

    //TODO: not getting payload from the front end
    let payload = req.body
    // console.log('request: ', res)
    console.log('body payload: ', payload)

    store.dispatch({type: 'CLICK_TILE', payload: payload})

    //TODO: Figure out how to return several states

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
