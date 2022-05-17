class Vue {
  constructor (options) {
    // 1 存储属性
    this.$options = options || {}
    this.$data = options.data || {}
    // 判断 el 值的类型，并进行相应处理
    const { el } = options
    this.$el = typeof el === 'string' ? document.querySelector(el) : el

    // 2 将 data 属性注入到 Vue 实例中
    _proxyData(this, this.$data)

    // *3. 创建 Observer 实例监视 data 的属性变化
    new Observer(this.$data)

    // *4. 调用 Compiler
    new Compiler(this)
  }
}

// 将 data 的属性注入到 Vue 实例
function _proxyData (target, data) {
  Object.keys(data).forEach(key => {
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get () {
        return data[key]
      },
      set (newValue) {
        data[key] = newValue
      }
    })
  })
}