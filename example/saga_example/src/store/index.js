import {createStore, combineReducers} from 'redux';
import * as counter from './counter/reducer';
let store = createStore(
  combineReducers({ ...counter})
);

export default store;