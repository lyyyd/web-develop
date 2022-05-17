import React from 'react'
import C3 from './C3'

function C2(props) {
  // console.log(props)
  return (
    <div>
      C2组件
      <C3 {...props} />
    </div>
  )
}

export default C2
