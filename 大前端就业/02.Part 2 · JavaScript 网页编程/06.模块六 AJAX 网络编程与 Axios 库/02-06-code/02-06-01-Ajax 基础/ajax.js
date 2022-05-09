/**
     * 参数1：{string}    method  请求方法
     * 参数2：{string}    url     请求地址
     * 参数3：{Object}    params  请求参数
     * 参数4：{function}  done    请求完成后执行的回调函数
   */ 
  function ajax(method, url, params, done) {
    // 统一将方法中的字母转大写，便于后面判断
    method = method.toUpperCase();
    // 书写 IE 6 的兼容
    var xhr = window.XMLHttpRequest 
    ? new XMLHttpRequest() 
    : new ActiveXObject("Microsoft.XMLHTTP");
    // 将对象格式的参数转为 urlencoded的格式
    var pairs = [];
    for (var k in params) {
      pairs.push(k + "=" + params[k]);
    }
    var str = pairs.join("&");
    // 判断是否是 get 方法，需要更改 url 的值
    if (method === "GET") {
      url += "?" + str;
    }
    // 创建打开一个连接
    xhr.open(method, url);
    var data = null;
    // 如果是 post 方法，需要设置请求头，还有请求体
    if (method === "POST") {
      xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      data = str;
    }
    xhr.send(data);
    // 执行回调函数
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      // 执行外部传进来的回调函数即可
      // 需要用到响应体
      done(JSON.parse(this.responseText));
    }
  }