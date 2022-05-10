const fs = require('fs')

// 先判断文件是否存在
// 然后，如果文件存在的化，再执行删除
if (fs.existsSync(__dirname+"/1.txt")) {
    fs.unlinkSync(__dirname+"/1.txt")
} else {
    console.log('文件不存在')
}