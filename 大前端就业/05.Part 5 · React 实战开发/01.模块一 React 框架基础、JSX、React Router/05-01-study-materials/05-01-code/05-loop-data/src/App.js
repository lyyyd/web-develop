/**
 *  01 jsx 当中可以直接将数组中的数据解构
 */
// const arr = [<p>1</p>, <p>2222</p>, <p>3333</p>]
const arr = [
  {
    id: 1,
    name: 'zce', 
    age: 40, 
    salary: 1000000
  },
  {
    id: 2,
    name: 'zoe', 
    age: 18, 
    salary: 2000000
  }
]

function App() {
  const ret = arr.map(item =>{
    return (
      <li key={item.id}>
        <span>{item.name}--</span>
        <span>{item.age}--</span>
        <span>{item.salary}</span>
      </li>
    )
  })
  return <ul>{ret}</ul>
}

export default App
