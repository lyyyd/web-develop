
import React from 'react'

function C3(props) {
  console.log(props)
  return (
    <div>
      C3组件
      <button onClick={() => { props.change({ name: 'zoe', age: 100 }) }}>点击修改数据</button>
    </div>
  )
}

export default C3
