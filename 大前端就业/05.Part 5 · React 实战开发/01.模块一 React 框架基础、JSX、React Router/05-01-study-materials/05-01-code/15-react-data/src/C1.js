import React from 'react'
import C2 from './C2'

function C1(props) {
  // console.log(props)
  return (
    <div>
      C1组件
      <C2 {...props} />
      {props.name}
    </div>
  )
}

export default C1