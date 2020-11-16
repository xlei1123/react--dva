import React, {Component} from 'react';
import ReactDom from 'react-dom'

class Count extends Component{
    constructor() {
        super()
    }
    state = {
        count: 1,
        num: 2
    }
    handleClick() {
        
        this.setState({
            count: this.state.count+1
        })

        
        this.setState({
            num: this.state.num+1
        })

        this.setState({
            count: this.state.count+2
        })


        
    }
    render(){
        return (
            <div>
                <h1>{this.state.count}</h1>
                <h2>{this.state.num}</h2>
                <button onClick={this.handleClick}>按钮</button>
            </div>
        )
    }
}

ReactDom.render(<Count></Count>,window.root)