var num = 3.14
console.log(parseInt(num))

var timer = setTimeout(() => {
    console.log(1)
}, 2000)

// 清除一次性定时任务
// clearTimeout(timer)

// 在实践队列开始之前，立即执行
setImmediate(() => {
    console.log(2)
})

// 在主进程结束后立即执行
process.nextTick(() => {
    console.log(7)
})