const fs = require('fs')

// 追加写入
// 语法： fs.appendWrite('文件路径'，'写入内容', 回调函数)
fs.appendFile(__dirname+'/2.txt', '曾经有一首歌，她是这样唱的\n', (err) => {
    if (err) throw err
    console.log('追加写入成功') 
})

// 有数组a
var a = ['数据1', '数据2', '数据3']
/**
 * 通过 appendFile 实现如下写入
 * 数据1
 * 数据2
 * 数据3
 */