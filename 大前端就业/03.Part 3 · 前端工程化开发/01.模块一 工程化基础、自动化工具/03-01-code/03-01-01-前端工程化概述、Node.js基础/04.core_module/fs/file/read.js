const fs = require('fs')
const path = require('path')

// 读文件
// 指定目标文件所在的路径
// var filename = __dirname + '/1.txt'
var filename = path.join(__dirname, '1.txt')

// 语法：fs.readFile('文件路径', 回调函数)
fs.readFile(filename, (err, data) => {
    if (err) throw err
    // data 是二进制数据，默认输出时，以十六进制的方式展示
    console.log(data.toString())
})