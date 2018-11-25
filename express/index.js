const express = require('express');
const bodyParser = require('body-parser');
let { availableMoves, clickTile, initializeLevel } = require('./resources/functions');
const redux = require('redux');
const app = express();
let store = require('./redux/store');

let db;
//TODO: connect to db to connect

app.listen(process.env.port || 8000, () => {
    console.log('Runing on port 8000');
});

app.use(bodyParser.json())

app.post('/clickTile', (req, res) => {
    let message = req.body
    console.log('Message is: ', message)
})

app.post('/initializeLevel', (req, res) => {

    //TODO: Dispatch action
    store.dispatch({type:'INIT_GAME'})

    let state = store.getState()
    let response = JSON.stringify(state)
    res.send(response)
})

//Function that subscribes to state change
// const unsubscribe = store.subscribe(() => console.log('state changed: ',store.getState()))
