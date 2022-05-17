import Radium from 'radium'

/**
 * 一、内联样式
 *  1 设置样式的时候应该将键值对放置于 {}
 *  2 内联样式默认无法支持伪类及媒询样式设置
 *  3 radium
 *    a 导入 Radium 函数将当前需要支持伪类操作的组件包裹之后再导出
 *    b
 *
 * 二、外联样式
 */
// const styleObj = {
//   width: 100,
//   height: 100,
//   backgroundColor: 'green',
//   ":hover": { backgroundColor: 'skyblue' },
//   "@media (max-width: 1000px)": { width: 300 }
// }
const ButtonStyle = {
  base: {
    width: 150,
    height: 40,
    fontSize: 20,
    background: '#ffff'
  },
  login: {
    background: 'green'
  },
  logout: {
    background: 'orange'
  }
}
const isLogin = false
function App() {
  return (
    // <div style={styleObj}>样式处理</div>
    <div>
      <button style={[
        ButtonStyle.base,
        isLogin ? ButtonStyle.login : ButtonStyle.logout
      ]}>按钮</button>
    </div>
  )
}

export default Radium(App)
