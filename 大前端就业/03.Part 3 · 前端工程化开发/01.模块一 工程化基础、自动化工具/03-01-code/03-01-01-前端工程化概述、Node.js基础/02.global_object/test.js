var b = 2

console.log('b:', b)

// 在脚本模式下，声明的变量和函数都不属于全局对象 global
console.log('global.b:', global.b)

// Node.js 不能访问浏览器端的全局对象 window
// console.log(window)

console.log(global)
