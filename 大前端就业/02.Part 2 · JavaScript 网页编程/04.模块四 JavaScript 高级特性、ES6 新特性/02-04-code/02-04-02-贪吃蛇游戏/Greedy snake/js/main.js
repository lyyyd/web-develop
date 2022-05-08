// 使用自调用函数关住作用域
(function () {
  var map = document.getElementById("map");
  var game = new Game(map);
  game.start();
})();