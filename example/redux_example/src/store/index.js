import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as home from './home/reducer';
import * as production from './production/reducer';

let store = createStore(
  combineReducers({...home, ...production})
);

export default store;