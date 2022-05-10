// 引入文件模块
const circle = require('./circle')

// const r = 10

// console.log('周长：', circle.perimeter(r))
// console.log('面积：', circle.area(r))


// 引入目录模块
// 默认的目录模块的入口文件是 index.js
const dir01 = require('./dir01')

console.log(dir01.info())

// 不以路径开头的引入方式
const dir02 = require('dir02')

console.log(dir02.info())