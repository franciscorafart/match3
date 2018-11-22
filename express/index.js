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

    //create state
});

app.use(bodyParser.json())

app.post('/clickTile', (req, res) => {
    let message = req.body
    console.log('Message is: ', message)
})

app.post('/initializeLevel', (req, res) => {

    //TODO: Dispatch action
    store.dispatch({type:'INIT_GAME'})

    console.log('/initializeLevel endpoint')
    res.send('Connected!')
})
