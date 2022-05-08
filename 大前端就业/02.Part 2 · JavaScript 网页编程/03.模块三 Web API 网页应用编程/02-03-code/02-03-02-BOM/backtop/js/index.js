// 获取页面卷动的距离
// document.body.scrollTop
// document.documentElement.scrollTop
// 获取元素
var header = my$("top");
var backtop = my$("totop");
// 1.在页面往下卷动到一定距离后，让 header 高度变低，让 返回顶部按钮出现
// 添加页面滚动事件
window.onscroll = function () {
  // 判断卷动走的距离，如果超过 10 px，就让 header 变低，让 返回顶部按钮出现
  if (document.documentElement.scrollTop > 10) {
    header.className = "header fixed";
    backtop.style.display = "block";
  } else {
    header.className = "header";
    backtop.style.display = "none";
  }

  // console.log(document.documentElement.scrollTop);
};
// 变量存储定时器
var timer;
// 2.点击返回顶部，让页面以动画的方式跳转到页面顶部
backtop.onclick = function () {
  // 终点
  var target = 0;
  // 起始点
  var current = document.documentElement.scrollTop;
  // 步长
  var step = 30;
  timer = setInterval(function () {
    // 获取当前卷动的值，每次递减一个步长
    current -= step;
    // 停止定时器
    if (current <= target) {
      current = target;
      clearInterval(timer);
    }
    // 重新赋值
    document.documentElement.scrollTop = current;
  },10);
};