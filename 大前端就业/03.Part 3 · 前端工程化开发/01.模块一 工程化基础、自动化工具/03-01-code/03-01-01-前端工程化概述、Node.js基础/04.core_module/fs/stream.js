const fs = require('fs')

// 1. 创建读取流
var readStream = fs.createReadStream('./file2.txt')

// 2. 创建写入流
var writeStream = fs.createWriteStream('./file_stream.txt')

// 3. 把读取流通过管道传给写入流
readStream.pipe(writeStream)