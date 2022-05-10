const fs = require('fs')

// 创建目录
// 语法：fs.mkdir('目录路径', 回调函数)
fs.mkdir('./d1', (err) => {
    if (err) throw err
    console.log('创建成功')
})