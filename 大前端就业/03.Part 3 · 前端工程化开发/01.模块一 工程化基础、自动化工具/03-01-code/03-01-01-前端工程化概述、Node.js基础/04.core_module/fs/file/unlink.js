const fs = require('fs')

// 语法： fs.unlink('文件路径', 回调函数)
fs.unlink(__dirname+'/1.txt', (err) => {
    if (err) throw err
    console.log('删除成功')
})