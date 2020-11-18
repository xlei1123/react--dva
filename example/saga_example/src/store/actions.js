import * as actionTypes from './action-type'

const actions = {
  add() {  //action creator  --> generator
    return {
      type: actionTypes.ASYNC_ADD
    }
  }
}

export default actions;