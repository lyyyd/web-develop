import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

// 1 导入模块（注意拼写，导入的名称不要拼错）
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'

// 2 注册模块（为 patch 函数添加模块对应的能力）
const patch = init([
  styleModule,
  eventListenersModule
])

// 3 使用模块
let vNode = h('div#box', {
  style: {
    backgroundColor: 'green',
    height: '200px',
    width: '200px'
  }
}, [
  h('h1#title', {
    style: {
      color: '#fff'
    },
    on: {
      click () {
        console.log('点击了 h1 标签')
      }
    }
  }, '这是标题内容'),
  h('p', '这是内容文本')
])


const dom = document.getElementById('app')
patch(dom, vNode)