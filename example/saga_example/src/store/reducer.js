import * as actionTypes from './action-type'

const nameInitialState = {
  number: 0
}
const reducer = (state = nameInitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return { number: state.number + 1 }
    default:
      return state
  }
}

export default reducer;