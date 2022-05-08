// console.log(tools.getColor());
var stage = document.getElementById("stage");
    
// 通过一个空数组，记录添加的所有方块对象
var arr = [];
// 循环添加是个方块到页面上
for (var i = 1 ; i <= 10 ; i++) {
  // 生成一个实例
  var block = new Block(stage,{backgroundColor: Tools.getColor()});
  block.render();
  // 初始阶段就让元素随机位置
  block.positionRandom();
  // 数组中添加记录一项
  arr.push(block);
}
// 需要每隔一段时间让位置再次随机变化
// 开启定时器
setInterval(function () {
  for (var i = 0 ; i < arr.length ; i++) {
    arr[i].positionRandom();
  }
},1000);