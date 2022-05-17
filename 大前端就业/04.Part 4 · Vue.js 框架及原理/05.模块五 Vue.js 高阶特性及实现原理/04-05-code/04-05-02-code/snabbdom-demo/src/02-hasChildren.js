import { h } from 'snabbdom/build/package/h'
import { init } from 'snabbdom/build/package/init'

const patch = init([])

// 创建包含子节点的 VNode
//   - 参数2的数组为子节点列表，内部就应该传入 vNode
let vNode = h('div#container', [
  h('h1', '标题文本'),
  h('p', '内容文本')
])

// 获取挂载元素
const dom = document.querySelector('#app')

// 渲染 vNode
const oldVNode = patch(dom, vNode)

patch(oldVNode, h('!'))