import React, { Component } from "react";
import { connect } from "react-redux";
import Counter  from './components/Counter'
class Index extends Component {
  render() {
    return (
      <div>
        父组件 当前计数 {this.props.num}
        <Counter/>
      </div>
    );
  }
}

export default connect(({CounterData}) => ({
  ...CounterData
}))(Index)
