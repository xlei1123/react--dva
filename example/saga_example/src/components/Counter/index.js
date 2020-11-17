import React, {Component} from 'react';
import { connect } from 'react-redux';
import { get, add } from '../../store/counter/action'
class Counter extends Component{
  render(){
    return (
      <div onClick={this.handleClick}>
        <p>您累计点击了{this.props.count}, 每次点击加2</p>
        <button onClick={this.props.add}>点击</button>
      </div>
    )
  }
}

export default connect(({CounterData}) => {
  return {
    ...CounterData
  }
}, {get, add})(Counter)