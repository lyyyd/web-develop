import About from './About'
import Header from './Header'

const obj = {
  name: 'zce',
  age: 40
}


function App() {
  return (
    <div>
      <Header>
        <p>Header组中的 P标签</p>
        <span>Header组件中的 span标签</span>
      </Header>
      <About>
        <p>About 中p标签</p>
      </About>
    </div>
  )
}

export default App
