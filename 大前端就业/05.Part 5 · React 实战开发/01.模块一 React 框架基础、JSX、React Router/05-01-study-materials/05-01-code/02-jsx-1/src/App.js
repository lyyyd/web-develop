/**
 * 01 JSX 可以看做是JS语言的扩展，它既不是一个字符串也不是一个HTML 
 * 02 它具备了 JS 所有的功能，同时还可以被转为 HTML 在界面上进行展示（react react-dom）
 * 
 * 
 * - 动态显示数据  {}
 * - 调用方法: 自定义 + 内置 
 * - 支持表达式, 支持三元表达式
 * - 模板字符串
 */

const name= '拉勾教育'
const flag = true
const obj = {
  name: '拉勾教育',
  age: 100
}

function sayHello () {
  return '大家好'
}

function App() {
  return (
    <div>
      <p>{name}</p>
      <p>name</p>
      <p>{sayHello()}</p>
      <p>{console.log('1111')}</p>
      <p>{Math.random()}</p>
      <p>{flag ? '登录的状态' : '执行登录'}</p>
      <p>{`hello, ${name}`}</p>
      <p>1224{/*这里是注释的内容 */}</p>
      <p>{JSON.stringify(obj)}</p>
    </div>
  )
}

export default App
