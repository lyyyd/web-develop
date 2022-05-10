// process 是全局变量，使用时，无需引入
// const process = require('process')

// console.log(process)

// 输出 node 版本
console.log(process.version)

// 输出操作系统架构
console.log(process.arch)

// 输出操作系统平台
console.log(process.platform)

// 输出当前工作目录 cwd = current working directory
console.log(process.cwd())

// 环境变量
console.log(process.env)
// 自定义环境变量
process.env.NODE_ENV = 'develop'
console.log(process.env)

// 获取进程的编号
console.log(process.pid)

// 杀死进程  process.kill(进程编号)
