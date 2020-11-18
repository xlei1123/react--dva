import React, { Component } from "react";
import { connect } from 'react-redux'
import actions from './store/actions'
class Counter extends Component {
  render() {
    return (
      <div>
          <p>{this.props.number}</p>
          <button onClick={this.props.add}>+</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    // prop: state.prop 也可以这样过滤
  }
}
export default connect(mapStateToProps, actions )(Counter);