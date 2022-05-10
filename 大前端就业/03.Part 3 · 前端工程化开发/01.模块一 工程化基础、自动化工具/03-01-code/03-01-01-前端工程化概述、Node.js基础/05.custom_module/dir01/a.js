// 引入 b.js
const b = require(__dirname+'/b.js')
const c = require(__dirname+'/c.js')

function info() {
    // 调用 b 中的info函数
    console.log(b.info())
    console.log('a.js')
    console.log(c.info())
}

module.exports = {
    info
}