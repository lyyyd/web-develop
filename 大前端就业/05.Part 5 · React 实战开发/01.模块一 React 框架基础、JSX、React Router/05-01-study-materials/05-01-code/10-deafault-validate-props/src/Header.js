import React, { Component } from 'react'

class Header extends Component {

  static defaultProps = {
    name: '拉勾教育',
    age: 100
  }

  render() {

    // 在类组件当中存在一个 props 属性，外部所传递进来的数据的都可以通过它进行访问 
    const { name, age } = this.props

    return (
      <div>
        <p>{name}</p>
        <p>{age}</p>
      </div>
    )
  }
}

export default Header