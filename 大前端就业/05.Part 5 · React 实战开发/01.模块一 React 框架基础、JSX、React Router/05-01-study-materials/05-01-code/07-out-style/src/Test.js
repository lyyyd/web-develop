import React from 'react'
import style from './Test.module.css'
import styled from 'styled-components'

// 自定义标签
const SectionDiv = styled.div.attrs({
  className: 'box1 box2'
})`
  width: 100px;
  height: 100px;
  background-color: hotpink;
`

function Test () {
  return (
    <div>
      <div className={'box'}>Test 中的 div</div>
      <p className={style.item}>Test中的P,使用自己的样式</p>
      <SectionDiv />
    </div>
  )
}

export default Test