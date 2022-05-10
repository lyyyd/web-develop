// 文件的写操作
const fs = require('fs')

// 清空写入
// fs.writeFile('文件路径', '写入内容', 回调函数)
fs.writeFile('./1.txt', '曾经有一首歌，她感动了我', (err) => {
    if (err) throw err
    console.log('写入成功')
})