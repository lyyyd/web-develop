var $lis = $(".subnav ul li");
var $jds = $(".louceng .jd");
// 使用数组存储每一层距离顶部的高度
var arr = [];
// 遍历所有的楼层，记住每一层 的 高度
$jds.each(function (i) {
  // 每一项都要存储自己的高度到数组中
  arr[i] = $(this).offset().top;
})
console.log(arr)
// 添加页面滚动事件
$(document).scroll(function () {
  // 判断卷走的距离是否大于等于第一层距离顶部的高度
  // 如果大于让侧边栏导航显示，否则隐藏
  var v = $(this).scrollTop();
  if (v >= arr[0]) {
    $(".subnav").show();
  } else {
    $(".subnav").hide();
  }

  // 在滚动过程中，需要判断处于哪个楼层
  // 让对应的导航的 li 标签高亮显示，其他的默认
  $jds.each(function (i) {
    if (v >= arr[i]) {
      $lis.eq(i).addClass("current").siblings().removeClass("current");
    } 
  })
})

// 给导航添加点击事件
$lis.click(function () {
  // 获取用户点击的楼层的下标
  var idx = $(this).index();
  // 找到对应的楼层，获取这个楼层距离顶部的高度
  var value = arr[idx];
  // 给页面添加一个运动效果，运动到指定的楼层位置
  $("html,body").animate({"scrollTop": value},500)
})