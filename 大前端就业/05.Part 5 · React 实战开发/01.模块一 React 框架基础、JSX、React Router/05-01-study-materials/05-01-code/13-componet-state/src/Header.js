import React, { Component } from 'react'

class Header extends Component {

  // 在类组件当中默认就存在一个 state 属性，它是一个对象，可以用于保存当前组件的数据
  // 之后还可以通过 setState 方法来修改数据的值，最后修改之后结状态会自动展示在 DOM 界面上
  state = {
    name: 'zce',
    age: 40
  }

  handler = () => {
    // 在 react 当中是不能够直接来修改 state 值的
    // this.state.name = 'zoe'
    this.setState({
      name: 'zoe'
    })
  }

  render() {
    return (
      <>
        {this.state.name}
        {this.state.age}
        <button onClick={this.handler}>点击</button>
      </>
    )
  }
}

export default Header 