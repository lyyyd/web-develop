console.log("1")
console.log(1)

var obj = {
    name: 'Tom',
    age: 18
}
console.log(obj)
console.table(obj)

// 计时函数
console.time('for') // 计时开始
for (let i = 0; i < 1000000; i++) {

}
console.timeEnd('for') // 计时结束

console.time('while')
var i = 0
while (i < 1000000) {
    i++;
}
console.timeEnd('while')
