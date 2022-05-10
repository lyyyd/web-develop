const http = require('http')

// 1. 创建服务器
/**
 * req = request 请求
 * res = response 响应
 */
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('你好：Node.js')
})

// 2. 发布 web 服务
const port = 3000
const host = 'localhost'
// 在浏览器中访问 http://localhost:3000 然后能看到效果
server.listen(port, host, () => {
    console.log(`服务器运行在 http://${host}:${port}`)
})