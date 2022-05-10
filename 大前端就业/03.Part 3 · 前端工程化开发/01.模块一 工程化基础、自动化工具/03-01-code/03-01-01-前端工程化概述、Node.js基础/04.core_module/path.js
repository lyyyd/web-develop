// 引入 path 模块
const path = require('path')

// 获取当前文件所在的路径
console.log(process.cwd())

// dir = directory 目录
console.log(__dirname) // 获取当前文件所在的路径

// D:\cliu\Desktop\node\03.core_module\path.js
console.log(__filename) // 获取当前文件的完整路径

// 获取文件的扩展名 ext = extension 
console.log(path.extname(__filename))

// 获取路径中的目录部分
console.log(path.dirname(__filename))

// 获取路径中的文件名
console.log(path.basename(__filename))

const t = path.join(__dirname, '..')
console.log(t)
// 将多个路径合并起来
const a = path.join('D:/', 'a', 'b', 'c.png')
console.log(a)