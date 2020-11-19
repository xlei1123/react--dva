import * as actionTypes from './action-type'

import { put, take } from 'redux-saga/effects';

export function * rootSaga() {
  for(let i = 0; i<3; i++) {
    const action = yield take(actionTypes.ASYNC_ADD);   
    yield put({type: actionTypes.ADD})  // store.dispatch({type: actionTypes.ADD})
  }
}


//put  发布