import React, {Component} from 'react';
import ReactDom from 'react-dom'
import Counter from './Components/Counter'
class App extends Component{
  constructor() {
    super()
  }
  state = {
    count: 1,
    num: 2
  }
  handleClick() {
    this.setState({
      count: this.state.count+1,
      num: this.state.num+2
    })
  }
  render(){
    const { count, num } = this.state;
    return (
      <div>
        <h1>{this.state.num}</h1>
        <Counter count={count}></Counter>
        <button onClick={this.handleClick} handleClick={this.handleClick}>按钮</button>
      </div>
    )
  }
}

ReactDom.render(<App/>,window.root)