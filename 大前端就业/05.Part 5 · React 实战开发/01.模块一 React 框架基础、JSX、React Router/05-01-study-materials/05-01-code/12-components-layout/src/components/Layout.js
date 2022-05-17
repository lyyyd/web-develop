/**
 * 当前组件的作用就是将 header 与  footer 显示出来，同时中的 main 内容空出来
 * 将来我们传入什么样的 JSX 那么 main 里就显示什么样的 DOM 
 */
import Header from './Header'
import Footer from './Footer'

function Layout(props) {
  return (
    <>
      <Header />
      <div className="main">
        {props.children}
      </div>
      <Footer />
    </>
  )
}

export default Layout