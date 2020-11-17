import * as TYPE from './action-type';

let defaultState = {
  count: 1,
  num: 2
  
}

export const CounterData = (state = defaultState, action) => {
  switch(action.type){
    case TYPE.GET: 
      return {...state}
    case TYPE.ADD:
      return {
        count: state.count + 1,
        num: state.num + 2
      }
    default: 
      return state;
  }
}