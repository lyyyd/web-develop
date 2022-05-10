const fs = require('fs')
const path = require('path')

// 把 src/style.css 复制到 dist/ 目录下
const dist = path.join(__dirname, 'dist')

fs.readFile('./src/style.css', (err, data) => {
    if (err) {
        throw err
    } else {
        console.log(data.toString())

        // 确保 dist 目录存在
        if (!fs.existsSync(dist)) {
            fs.mkdirSync(dist)
        }

        // 对文件进行压缩： 将无用的注释或空格去掉
        //                                                        /*  注释的内容  */
        var mydata = data.toString().replace(/\s+/g, '').replace(/\/\*{1,2}[\s\S]*\*\//g, '')

        // 将读到的内容，写入目标文件
        fs.writeFile(dist+'/style.min.css', mydata, (err) => {
            if (err) throw err
            console.log('成功')
        })
    }
})