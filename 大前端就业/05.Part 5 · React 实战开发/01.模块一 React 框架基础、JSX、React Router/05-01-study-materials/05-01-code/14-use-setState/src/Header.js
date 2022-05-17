import React, { Component } from 'react'

/**
 * 1 setState 是异步函数
 *  - 可以使用 async 与 await 来解决 setState异步执行的问题  
 *  - 调用 setState 的时候可以传入回调函数，在它里面就可以使用修改之后的数据
 * 
 * 2 setState 在使用的时候除了可以传入对象之外还能够传入一个函数 
 * 
 * 3 setState 在使用的时候既可以传入函数，也可以传入对象，且都是有不同的点的
 *  
 * 
 */

class Header extends Component {
  state = {
    name: 'zce',
    age: 40,
    count: 0
  }

  handler = () => {
    // this.setState({
    //   name: 'zoe'
    // }, () => {
    //   console.log(this.state.name, 22222)
    // })

    // this.setState((state) => ({
    //   count: state.count + 1
    // }))

    // this.setState((state) => ({
    //   count: state.count + 5
    // }))

    this.setState({
      count: this.state.count + 1
    })

    this.setState({
      count: this.state.count + 5
    })

  }

  render() {
    return (
      <>
        <div>
          {this.state.name}
          {this.state.age}
        </div>
        <hr />
        <div>
          <span>{this.state.count}</span>
          <button onClick={this.handler}>点击</button>
        </div>
      </>
    )
  }
}

export default Header 