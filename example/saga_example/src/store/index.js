import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'; 
import reducer from './reducer';
import { rootSaga } from './saga.js';  // generator

const sagaMiddleware = createSagaMiddleware()

let store = applyMiddleware(sagaMiddleware)(createStore)(reducer)

sagaMiddleware.run(rootSaga);


export default store;