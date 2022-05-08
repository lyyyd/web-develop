// 制作一个工具对象，内部添加多种工具的方法
var Tools = {
  // 获取一个范围内部的随机整数
  getRandom: function (min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
  },
  // 获取随机颜色的方法
  getColor: function () {
    // rgb(r,g,b)  三个色值的颜色可以随机获取 0-255 之间的数字
    // 获取三个色值
    var r = this.getRandom(0,255);
    var g = this.getRandom(0,255);
    var b = this.getRandom(0,255);
    // 返回一个 颜色值
    return "rgb("+r+","+g+","+b+")";
  }
};