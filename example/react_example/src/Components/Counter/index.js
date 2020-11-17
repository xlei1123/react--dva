import React, {Component} from 'react';
export default class Index extends Component{
  handleClick() {
    // this.props.count = this.props.count + 1;
    // console.log('单向数据流 子组件不可以更改父组件的状态')
  }
  render(){
    // 通过props获取父组件传过来的数据
    const { count } = this.props;
    return (
      <div onClick={this.handleClick}>
        <p>您累计点击了{this.props.count}</p>
        <button onClick={this.props.handleClick}></button>
      </div>
    )
  }
}