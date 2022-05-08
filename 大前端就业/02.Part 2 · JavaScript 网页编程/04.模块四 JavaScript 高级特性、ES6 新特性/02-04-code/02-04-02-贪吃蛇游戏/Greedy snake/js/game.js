// 自调用函数封闭作用域
(function () {
  // 定义一个全局变量，存储 this 
  var that;
  // 创建一个 游戏 的构造函数
  function Game(map) {
    // 设置三个属性，存储 食物、 蛇、地图
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
  }
  // 添加一个游戏开始的方法，方法内初始化蛇和食物
  Game.prototype.start = function () {
    // 1.添加蛇和食物到 地图上
    this.food.render(this.map);
    this.food.render(this.map);
    this.food.render(this.map);
    this.snake.render(this.map);
    // 2.让游戏逻辑开始
    // 2.1 让蛇自动运动起来
    runSnake();
    // 2.2 通过上下左右箭头控制蛇的运动方向
    bindKey(); 

  }
  // 封装一个私有函数，控制上下左右按键更改的方向
  function bindKey() {
    // 给文档绑定键盘按下事件
    document.onkeydown = function (e) {
      // console.log(e.keyCode);
      // 键盘的编码
      // 37 -- left
      // 38 -- top
      // 39 -- right
      // 40 -- bottom
      switch (e.keyCode) {
        case 37:
          that.snake.direction = "left";
          break;
        case 38:
          that.snake.direction = "top";
          break;
        case 39:
          that.snake.direction = "right";
          break;
        case 40:
          that.snake.direction = "bottom";
          break;
      }
    };
  }
  // 封装一个私有函数，这个函数只能在模块内部进行调用
  function runSnake() {
    // 开启一个定时器，让蛇连续运动起来
    var timer = setInterval(function () {
      // 定时器函数内部的 this 指向的是 window
      // 让蛇运动起来    
      that.snake.move();
      // 删掉上一次的蛇
      that.snake.remove(that.map);
      // 渲染新位置的蛇
      that.snake.render(that.map);
      // 记录一下最大的位置
      var maxX = that.map.offsetWidth / that.snake.width;
      var maxY = that.map.offsetHeight / that.snake.height;
      // 找到当前蛇头的位置
      var headX = that.snake.body[0].x;
      var headY = that.snake.body[0].y;
      // 每一次蛇走到新的位置，都要判断一下是否吃到食物了
      // 2.3 判断蛇头与食物是否碰撞，吃掉食物 ，让自己增加一节
      // 记录一下食物的坐标
      // var foodX = that.food.x;
      // var foodY = that.food.y;
      // 获取蛇头的具体坐标位置，px值
      var hX = headX * that.snake.width;
      var hY = headY * that.snake.height;
      // 判断
      // 将食物的数组中每一个都要进行对比，谁被吃掉，删除自己，渲染一个新的元素
      for (var i = 0 ; i < that.food.elements.length ; i++) {
        if (that.food.elements[i].offsetLeft === hX && that.food.elements[i].offsetTop === hY) {
          // 吃到了食物
          // 让食物删除，然后渲染一个新的食物
          that.food.remove(that.map,i);
          that.food.render(that.map);
          // 添加一个新的蛇节
          var last = that.snake.body[that.snake.body.length - 1];
          that.snake.body.push({
            x: last.x,
            y: last.y,
            color: last.color
          });
        }
      }
      // 每移动一次，都要判断是否出了地图，游戏是否结束
      // 2.4 判断是否超出地图范围，结束游戏      
      // 进行判断
      if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
        // 停止定时器
        clearInterval(timer);
        // 弹出提醒
        alert("Game over");
      }
    }, 150);
  }
  // 将构造函数通过 window 暴露
  window.Game = Game;
})();

