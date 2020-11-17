import React, {Component} from 'react';

class Counter extends Component{
  render(){
    return (
      <div onClick={this.handleClick}>
        <p>您累计点击了{this.props.count}</p>
        <button onClick={this.props.handleClick}></button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Counter)