import Header from './Header'
/**
 * 组件状态： 状态就数据，因此组件状态指的就是某一个组件自己的数据 
 * 数据驱动 DOM ： 当我们修改某一个数据的时候，界面上的DOM中数据展示也会自动更新 
 * 组件状态管理 
 */

function App() {
  // const obj = {
  //   name: 'syy',
  //   age: 18
  // }
  return (
    <div>
      <Header />
    </div>
  )
}

export default App
