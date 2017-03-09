import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import shortApp from './reducers';
import initialState from './initialState';

const state = initialState();

export default function configureStore() {
  return createStore(
    shortApp,
    state,
    applyMiddleware(thunkMiddleware),
  );
}
