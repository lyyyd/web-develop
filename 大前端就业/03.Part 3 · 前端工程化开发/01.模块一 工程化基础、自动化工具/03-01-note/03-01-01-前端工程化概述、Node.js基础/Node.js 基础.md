# Node.js 基础



## 简介

Node.js 是除了浏览器之外的，另一个 JavaScript 的运行环境。

我们知道，JavaScript 可以在浏览器端运行。所以，浏览器是 JavaScript 的一个运行环境。而 Node.js 是除了浏览器之外，另一个可以运行 JavaScript 的环境。



<img src="C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201008154820397.png" alt="image-20201008154820397" style="zoom: 50%;" />



区别在于，Node.js 这个运行环境，是根植于操作系统之上的。提供了一些与操作系统交互的 APIs，例如：文件操作，web 服务发布等。所以，只是 JavaScript 换了一个地方运行而已， Node.js 的语法还是原来 JavaScript 的语法。



<img src="C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201012123601984.png" alt="image-20201012123601984" style="zoom: 50%;" />



**官网**：https://nodejs.org/

**中文网**：http://nodejs.cn/

**历史**

作者：Ryan dahl

<img src="C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201012182403080.png" alt="image-20201012182403080" style="zoom:33%;" />

发展：

* 2009 2 月份 Node.js 有想法
* 2009 5 月份 Githup 开源
* 2009 11月份 jscon 讲解推广 Node.js
* 2012 年 迅速普及
* 2016 年 Node.js 6 发布



## 作用

浏览器端的 JS 负责与浏览器端的功能交互。Node.js 负责服务器端的功能交互。

具体来说：

- **Node.js 适合用于开发前端方向的各种工具**
  - **各种前端工程化的工具**

- Node.js 适合开发服务器端的应用层（BFF）
  - 为网站，APP，小程序等提供数据服务
- Node.js 可以用来做桌面应用开发
  - 各种跨平台的桌面应用



## 安装

**How**：官网下载对应的安装包, 一路 next 安装

**版本**：

​	偶数版本为稳定版 （0.6.x ，0.8.x ，0.10.x）
​	奇数版本为非稳定版（0.7.x ，0.9.x ，0.11.x）
​	LTS（Long Term Support）长期维护版本

**安装**

安装时，推荐安装 LTS 版本。

<img src="C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201021154102972.png" alt="image-20201021154102972" style="zoom: 67%;" />



在官网（或 中文镜像）下载与本地操作系统匹配的 Node.js 安装包。一路 next 安装。

![image-20201012141654471](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201012141654471.png)



安装完成后，进入命令行。

> Windows 系统进入命令行：快捷键 win+r，然后输出 cmd，之后回车（按 enter 键）

```javascript
# 查看 Node.js 版本
node --version
# 或
node -v
```

如果能看到 Node.js 的版本，说明安装完成。否则，根据报错信息提示解决。



## 使用

Node.js 的使用就是在 Node.js 环境下运行 JavaScript 代码。Node.js 下运行 JavaScript 有两种方式。

### 运行方式

1. 脚本模式

   ```javascript
   # 声明 app.js
   console.log("Hello Node.js")
   
   # 运行：node 代码路径/文件名.js
   node app.js # 返回 Hello Node.js
   ```


2. 交互模式

   ```javascript
   # 在命令行中，进入交互模式
   node # 回车，然后进入交互模式
   
   # 运行代码
   > console.log('Hello Node'); # 回车
   Hello Node
   
   # 退出交互模式
   两次 ctrl+c
   # 或
   输入 .exit
   ```

   > 交互模式适合调试代码，相当于浏览器上的控制台。

   

### 全局对象

浏览器端 JS 的全局对象是 window，Node.js 端的全局对象是 global。

1. Node.js 的全局对象是 global

   - 在交互模式下，声明的变量和创建的函数都**属于**是global下的   var a=1; global.a	

   - 在脚本模式下，声明的变量和创建的函数都**不属于** global 下的

   ```javascript
   // 脚本模式下，声明的变量不属于全局对象 global
   var a = 'aaa';
   
   console.log(a)        // 返回 aaa
   console.log(global.a) // 返回 undefined
   ```

2. 浏览器端声明的 JS 变量和创建的函数都属于全局 window 下的，var a=1; window.a

   但是 window 对象，在 Node.js 下不可用。

> **注意：DOM 和 BOM 中的对象，在 Node.js 环境下都不能使用**
>
> 例如：console.log(location); 
>
> 会报错：location is not defined



### 全局函数

全局函数在 Node.js 环境下都可用。

- JavaScript 语言提供的 APIs

  - parseInt/parseFloat/isNaN/isFinite/eval..

  - 一次性定时器（当定时时间到了之后，才会执行一次回调函数，单位是毫秒）

    开启：var timer = setTimeout(回调函数, 定时时间)
    清除：clearTimeout(timer)

  - 周期性定时器（每隔一段时间，执行一次回调函数）

    开启: var timer = setInterval(回调函数, 间隔时间)

    清除: clearInterval(timer)

- Node.js 环境中提供的 APIs

  - 立即执行定时器（在事件队列的开头执行）

    开启：var timer = **setImmediate**( 回调函数 )
    清除：clearImmediate(timer)

  - 进程立即执行定时器（在主程序的后边执行）

    process.nextTick( 回调函数 )



### 同步与异步

JS 是单线程模型，代码运行时，先执行主程序中的任务，主程序执行结束后，再执行事件队列。

![image-20201017103815152](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201017103815152.png)



**而 proccess.nextTick 是在主程序结束之后执行，setImmediate 则在事件队列的头部执行**

> **process.nextTick 和 setImmediate 的执行顺序是面试常考的一个知识点。**

![image-20201017103905177](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201017103905177.png)




## 模块

Node.js 中的模块是具有特定功能的对象。**按照模块的作者进行划分**，可以分成三类：

- 内置模块：也叫核心模块，
  - 对应 Web 端 JS 的宿主对象，例如：window，localtion，history 等；
  - 无需单独安装 - 会随着Node.js一起安装；
  - 可以在官方API文档中查看：http://nodejs.cn/api/
- 自定义模块：程序员自己写的，具有一定功能的代码块。
  - 文件模块：单独的一个 JS 文件组成的模块
  - 目录模块：多个 JS 文件组合在一起，放在一个目录中形成的模块
- 第三方模块：既不是内置模块，也不是自定义模块。
  - 对应 Web 端 JS 的第三方库，例如：jQuery，Bootstrap 等。
  - 想要使用，必须先安装（ 如同使用 jQuery 之前，必须先通过 script 标签引入一样 ）
  - 在Node.js中，大量的第三方模块通过 npm 来管理。

![image-20201021154712410](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201021154712410.png)



### 内置模块

内置模块（也叫核心模块）是官方提供的，无需下载，可以直接使用的模块。

官网：http://nodejs.cn/api/

   1. console

      `console` 模块提供了一个简单的调试控制台，类似于 Web 浏览器提供的 JavaScript 控制台。

      ```javascript
      // 不同类型的数据，输出后颜色不同
      console.log('1');
      console.log(1);
      
      var obj = { name: 'Tom', age: 19 }
      console.log(obj)
      console.table(obj) // 以表格方式展示数据
      
      console.time('for');//开始计时
      for (var i = 1; i <= 100000; i++) {
      }
      console.timeEnd('for');//结束计时
      
      console.time('while');
      var i = 1;
      while (i <= 100000) {
        i++;
      }
      console.timeEnd('while');
      ```

      

   2. process

      `process` 对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制。 作为全局变量，它始终可供 Node.js 应用程序使用，无需使用 `require()`。 它也可以使用 `require()` 显式地访问：

      ```javascript
      // process 是全局变量，可以不写 require 引入
      const process = require('process');
      
      // 获取操作系统架构  x64
      console.log(process.arch)
      
      // 当前系统平台信息  win32
      console.log(process.platform)
      
      // 获取当前文件所在的目录 D:\cliu\Desktop\node
      console.log(process.cwd())
      
      // 环境变量
      console.log(process.env)
      // 自定义环境变量
      process.env.NODE_ENV = 'develop'
      console.log(process.env)
      
      // 获取进程的编号
      console.log(process.pid)
      
      // 杀死进程  process.kill(进程编号)
      ```

      

   3. path

      path 模块负责文件路径的

      - **./** 表示当前目录
      - **../** 表示上一级目录
      - __dirname 返回当前文件所在的目录
      - __filename 返回当前文件的完整路径（目录+文件）

      ```javascript
      const path = require('path')
      
      // __dirname 获取当前文件所在的目录
      path.join(__dirname, 'dist')
      
      console.log('join用于拼接多个路径部分，并转化为正常格式');
      const temp = path.join(__dirname, '..', 'lyrics', './友谊之光.lrc');
      console.log(temp);
      
      console.log('获取路径中的文件名');
      console.log(path.basename(temp));
      
      console.log('获取一个路径中的目录部分');
      console.log(path.dirname(temp));
      
      console.log('获取一个路径中最后的扩展名');
      console.log(path.extname(temp));
      ```


   4. fs

      fs （file system）模块主要负责文件基本操作

      1. 文件操作

         ```javascript
         // 使用 fs 之前先引入
         const fs = require('fs')
         
         // 写文件 （清空写入：写入之前会先将文件清空）
         # fs.writeFile('文件路径','写入内容',回调函数)
         fs.writeFile('./1.txt', '曾经有一首歌，她感动了我', (err) => {
             if (err) throw err
             console.log('写入成功')
         })
         
         // 读文件
         # fs.readFile('文件路径', 回调函数)
         fs.readFile('./1.txt', (err, data) => {
             if (err) throw err
             // data 是二进制数据，默认输出时，以十六进制的方式展示
             // 想要看到正常的效果，需要通过 toString() 转换
             console.log(data.toString())
         })
         
         // 删除文件
         # fs.unlink('文件路径', 回调函数)
         fs.unlink(__dirname+'/1.txt', (err) => {
             if (err) throw err
             console.log('删除成功')
         })
         
         // 追加写入（多次执行，文件中会有多条数据）
         # fs.appendFile('文件路径','写入内容',回调函数)
         fs.appendFile(__dirname+'/2.txt', '曾经有一首歌，她是这样唱的\n', (err) => {
             if (err) throw err
             console.log('追加写入成功') 
         })
         ```

         

      2. 目录操作

         ```javascript
         // 创建目录
         fs.mkdir('./d1', (err) => {
           if (err) throw err
           console.log('创建成功')
         })
         
         // 删除目录
         fs.rmdir('./d1', (err) => {
           if (err) throw err
           console.log('删除成功')
         })
         
         // 重命名目录
         fs.rename(__dirname+'/d1', __dirname+'/d2', (err) => {
           if (err) throw err
           console.log('重命名成功')
         })
         
         // 读取目录
         fs.readdir(__dirname, (err, data) => {
           if (err) throw err
           // console.log(data) // data 是数组
           data.map((d) => {
             console.log(d)
           })
         })
         
         // 判断文件是否存在
         if (!fs.existsSync('./d2')) {
           fs.mkdirSync('./d2')
         }
         ```

         

      3. fs.stat 查看状态

         ```javascript
         // 查看文件信息
         fs.stat(__dirname+"/a.txt", (err, stat) => {
           if (err) throw err
           if (stat.isDirectory()) {
             // 判断当前文件是否是目录
             console.log('目录：', d)
           } else if (stat.isFile()) {
             // 判断当前文件是否是普通文件
             console.log('文件：', d)
           }
         })
         ```

   5. http

      以前，我们使用 Apache 或 Nginx 来搭建服务器。Node.js 中，也有搭建服务器的模块。就是 http 模块。

      ```javascript
      const http = require('http')
      
      // 1. 创建服务器
      /**
       * req = request  请求
       * res = response 响应
       */
      const server = http.createServer((req, res) => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end('你好：Node.js')
      })
      
      // 2. 发布 web 服务
      const port = 3000
      const host = 'localhost'
      // 在浏览器中访问 http://localhost:3000 然后能看到效果
      server.listen(port, host, () => {
          console.log(`服务器运行在 http://${host}:${port}`)
      })
      ```



### 自定义模块

自定义模块就是工程师自己写的一段代码。可以是一个单独的 JS 文件，也可以是一个目录。

在模块中，只有导出（exports）的属性或方法才能被外部使用，没有导出的属性或方法是模块的私有方法，只能在模块内部使用。

模块的声明：

```javascript
// circle.js 我们声明一个模块 circle，模块中有两个方法，分别求圆的面积和周长。
const PI = 3.14

// 圆的周长
const perimeter = (r) => {
	return 2 * PI * r
}

// 圆的面积
function area (r) {
    return PI * Math.pow(r, 2)
}

// 模块内容导出后，才能被外部调用
module.exports = {
    perimeter,
    area
}
```

> module 变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
>
> 以下是 console.log(module) 的代码示例：
>
> <img src="C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201015104344856.png" alt="image-20201015104344856"  />



模块的使用：

```javascript
// 在 app.js 中引入模块
// 引入模块时，需要写引入路径，否则 require('circle') 会报错
const circle = require('./circle')

// 调用模块中的属性或方法
const r = 10
const p = circle.perimeter(r)
const a = circle.area(r)

console.log(`直径为 ${r} 的圆的周长是：` + p)
console.log(`直径为 ${r} 的圆的面积是：` + a)
```

> **注意：引入自定义模块时，需要带有引入路径，否则，会报错**



这里我们可以**根据文件的组织方式**，将模块分成**文件模块**和**目录模块**。

不同类型的模块，引入方式不同，其加载逻辑也不相同，一共有四种情况：

1. 以路径开头的文件模块
2. 不以路径开头的文件模块
3. 以路径开头的目录模块
4. 不以路径开头的目录模块

这里，我们将以上四种情况的加载逻辑整理成下表：

![image-20201015181056160](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201015181056160.png)


**package.json**

package.json 是目录模块的描述文件。

目录中可能有多个 js 文件，引入模块时，到底引入哪一个文件呢？

默认是 index.js。如果你希望默认引入的不是 index.js，则可以通过 package.json 中的 main 字段指定

```javascript
# package.json
{
    "main": "app.js"
}
```



**node_modules**

**如果引入目录模块时，没有指明引入路径。则默认加载当前目录下 node_modules 下的目录模块**。

**如果当前目录下没有 node_modules, 会到上一级目录（../）继续寻找，直到顶层目录。**

如下图：现在 1 中查找，如果 1 不存在，则找 2，以此类推，直到路径 5

![image-20201015111139523](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201015111139523.png)



### 第三方模块

Node.js 中的第三方模块是由社区维护的，有一个公共的平台 http://npmjs.com/。在这个平台上有超过 100 万个第三方模块。这里的第三方模块也叫包。前端工程化中的大部分工具，都以包的形式，存在与 npmjs.com 上

> 第三方模块使用前，需要单独安装，安装需要借助 npm 命令。



## npm 

### 简介

npm（Node Package Manager）是包管理工具。npm 会跟随 Node.js 一起安装。

```javascript
# 验证 npm 是否已经安装
npm --version
或
npm -v
```

npm 可以帮我们下载（安装）包和包的依赖

- 包：就是一坨代码，就是 Node.js 的第三方模块
- 包的依赖：是指包的辅助代码（例如：下载 Bootstrap 时，必须先下载 jQuery，因为 Bootstrap 是基于 jQuery 开发的，没有 jQuery，Bootstrap 就运行不起来。此时，我们说：Bootstrap 依赖 jQuery ）

> npm官网：https://www.npmjs.com/
>
> 在 npm 上，有超过 1000000 （一百万）个软件包。



![image-20201017104141751](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201017104141751.png)



### 修改 npm 镜像源

npm 命令下载包的资源地址，成为 npm 的镜像源。

默认 npm 的镜像源是国外的（npmjs.com），下载速度慢，为了提高下载速度，可以将 npm 的镜像源设置为国内的地址（例如：淘宝镜像源）

设置命令为:

````javascript
# 修改npm的镜像源
npm config set registry https://registry.npm.taobao.org

# 验证是否更改成功（查看镜像源）：
npm config get registry
````



### 全局安装（安装全局工具）

通过 npm 安装包时，考虑两种情况：

| 配置项   | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| 全局安装 | 包在多个项目中都能用到；此时将包当作全局工具使用<br />举例：公交车 |
| 局部安装 | 包只在当前项目中使用，其他项目不用，我们可以只在当前项目中安装包<br />举例：私家车 |



如果需要将 npm 包当作工具使用，就需要在命令行中全局安装。通过 --global 参数来指定。

安装命令是：**npm install <package-name> --global**

> **全局安装后的包放在那里了？**
>
> Windows下，全局安装的包默认存在 **C:\Users\当前用户名\AppData\Roaming\npm\node_modules** 下
>
> Mac 下，全局安装的包默认存在 **/usr/local/bin/lib/node_modules** 下



例如：安装 serve 包，作为web服务器。

```javascript
# npm install <package-name> --global // 全局安装模块

# 以serve为例，将 https://www.npmjs.com/package/serve 模块全局安装到本地
npm install --global serve 
# 或 简写为
npm i -g serve

# 查看是否安装成功
serve -v # 查看serve版本
serve -h # 查看帮助信息

# 启动 web 服务
serve folder_name # 启动指定目录下的项目
# 或
serve . # 启动当前目录
```



###  局部安装（安装项目包）

如果你需要的第三方包，只是在某个项目中使用（而不是作为全局工具来用），你可以在项目中进行局部安装。

1. 创建项目目录 

   ```
   mkdir project-name
   ```

2. 进入项目目录

   ```
   cd project-name
   ```

3. 初始化项目

   init 命令会帮我们创建 package.json 文件

   ```javascript
   # 初始化项目
   npm init # 回车后会进入交互式问答窗口，根据问答结果，帮我们生成 package.json
   
   # --yes 可以略过问答窗口（所有问题的答案都时默认值）
   npm init --yes
   # 或
   npm init -y
   ```

   项目初始化结束后，我们得到 package.json 文件

   ```javascript
   {
     "name": "01_start",     # 项目名称
     "version": "1.0.0",     # 项目版本
     "description": "",      # 项目描述
     "main": "index.js",     # 项目入口
     "scripts": {            # 脚本命令
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "keywords": [],         # 关键字,用于搜索引擎搜索
     "author": "",           # 作者信息
     "license": "ISC"        # 开源许可
   }
   
   ```

   

4. 安装包

   项目中安装的包，默认存在 **当前项目/node_modules** 目录下

   安装包时，涉及到两个重要的参数：

   - npm install <package-name> **--save**
     - 安装好后，包的信息会写入 package.json 的 dependencies 中；
     - dependencies 中的包，在开发和生产环境都使用，例如：jQuery。

   - npm install <package-name> **--save-dev**
     - 安装好后，包的信息会写入 package.json 的 devDependencies 中
     - devDependencies 中的包只用于开发环境，生产环境不需要。例如 minify，项目上线后，就不需要压缩文件了。

   | 配置项          | 命令                   | 描述                                       |
   | --------------- | ---------------------- | ------------------------------------------ |
   | devDependencies | --save-dev 简写 -D     | 开发环境，管理的依赖包仅在开发阶段有效     |
   | dependencies    | --save         简写 -S | 生产环境，管理的依赖包在项目上线后依然有效 |

   ```javascript
   # --save（-S） 安装好后写入 package.json 的 dependencies 中；
   # dependencies 依赖的包不仅开发环境能使用，生产环境也能使用，例如 jQuery 开发和线上环境都需要
   npm install jquery --save
   # 或
   npm i jquery -S
   
   # --save-dev（-D） 安装好后写入 package.json 的 devDependencies 中；
   # devDependencies是只会在开发环境下依赖的模块，例如 minify 只需要开发环境使用，上线后就不需要了
   npm install minify --save-dev
   # 或
   npm i minify -D
   ```

   

5. 命令行执行

   如果包安装在当前项目中（局部安装），则命令的执行路径是当前项目下的 .\node_modules\\.bin 目录下。

   ```sh
   # 局部安装包的执行路径
   .\node_modules\.bin\lessc input.less output.css
   ```

   如果包是全局安装，则命令执行的路径也是全局的

   ```shell
   # 全局安装包的执行路径
   lessc input.less output.css
   ```

   

