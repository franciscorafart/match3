import express from 'express';
import bodyParser from 'body-parser';
import clickTile from './redux/selectors/clickTile';
import initializeLevel from './redux/selectors/initializeLevel';
import redux from 'redux';
import  configureStore from './redux/store/configureStore';

const app = express();
let db;
const store = configureStore();

app.listen(process.env.port || 8000, () => {
  console.log('Running on port 8000');
});

app.use(bodyParser.json())

app.post('/clickTile', (req, res) => {
  const payload = req.body;

  store.dispatch(clickTile({ payload }));

  const state = store.getState();
  const response = JSON.stringify(state);
  res.send(response);
})

app.post('/initializeLevel', (req, res) => {
  store.dispatch({ type:'INIT_GAME' })

  const state = store.getState()
  const response = JSON.stringify(state)
  res.send(response)
})

//Function that subscribes to state change
// const unsubscribe = store.subscribe(() => console.log('state changed: ',store.getState()))
