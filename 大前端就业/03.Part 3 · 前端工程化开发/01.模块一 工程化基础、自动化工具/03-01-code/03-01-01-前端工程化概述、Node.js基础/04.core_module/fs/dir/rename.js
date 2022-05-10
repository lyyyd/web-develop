const fs = require('fs')

// 重命名目录
// 语法： fs.rename(旧名称, 新名称, 回调函数)
fs.rename(__dirname+'/d1', __dirname+'/d2', (err) => {
    if (err) throw err
    console.log('重命名成功')
})