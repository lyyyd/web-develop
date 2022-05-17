import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

// 1 通过 h 函数创建 VNode
let vNode = h('div#box.container', '新内容')

// 获取挂载元素
const dom = document.querySelector('#app')

// 2 通过 init 函数得到 patch 函数
const patch = init([])

// 3 通过 patch，将 vNode 渲染到 DOM
let oldVNode = patch(dom, vNode)

// 4 创建新的 VNode，更新给 oldVNode
vNode = h('p#text.abc', '这是p标签的内容')
patch(oldVNode, vNode)



