const fs = require('fs')

// 删除目录
// 语法： fs.rmdir('目录路径', 回调函数)
fs.rmdir('./d1', (err) => {
    if (err) throw err
    console.log('删除成功')
})

// 声明: rmdir 只能删除空目录
// 1. 先删除目录下的普通文件（清空目录）
// 2. 通过 rmdir 删除空目录
