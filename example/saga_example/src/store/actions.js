import * as actionTypes from './action-type'

const actions = {
  add() {  //action creator  --> saga中是generator  没有 直接到reducer
    return {
      type: actionTypes.ASYNC_ADD
    }
  }
}

export default actions;