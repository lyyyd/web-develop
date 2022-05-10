// circle 模块

// 当前模块的指代变量, module 标识当前模块
// console.log(module)

const PI = 3.14

/**
 * 计算圆的周长
 */
function perimeter(r) {
    return 2 * PI * r
}

/**
 * 计算圆的面积
 */
function area(r) {
    return PI * Math.pow(r, 2)
}

// 模块中的属性或方法，必须导出，然后才能被使用
module.exports = {
    perimeter,
    area
}