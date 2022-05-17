class Watcher {
  constructor (vm, key, cb) {
    // 当前 Vue 实例
    this.vm = vm
    // 订阅的属性名
    this.key = key
    // 数据变化后，要执行的回调
    this.cb = cb

    // 触发 Getter 前，将但当前订阅者实例存储给 Dep 类
    Dep.target = this
    // 记录属性更改之前的值，用于进行更新状态检测（导致了属性 Getter 的触发）
    this.oldValue = vm[key]
    // 操作完毕后清除 target，用于存储下一个 Watcher 实例
    Dep.target = null
  }
  // 封装数据变化时更新视图的功能
  update () {
    const newValue = this.vm[this.key]
    // 如果数据不变，无需更新
    if (newValue === this.oldValue) return
    // 数据改变，调用更新后的回调
    this.cb(newValue)
  }
}