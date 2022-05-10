const fs = require('fs')

// 读目录
// 语法：fs.readdir('目录路径', 回调函数)
fs.readdir(__dirname, (err, data) => {
    if (err) throw err
    // console.log(data)
    data.map((d) => {
        // console.log(d)
        fs.stat(__dirname+"/"+d, (err, stat) => {
            if (err) throw err
            if (stat.isDirectory()) {
                // 判断当前文件是否是目录
                console.log('目录：', d)
            } else if (stat.isFile()) {
                // 判断当前文件是否是普通文件
                console.log('文件：', d)
            }
        })
    })
})