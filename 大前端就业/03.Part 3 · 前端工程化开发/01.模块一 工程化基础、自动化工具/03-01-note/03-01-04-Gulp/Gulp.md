# Gulp

## 简介

### 自动化构建工具

自动化构建工具，可以帮我们又快又好的完成自动化构建任务。相比有 npm scripts，自动化构建工具，功能更为强大。更简单易学。其中比较流行的有三款：

- Grunt

  是第一款自动化构建工具，对前端工程化的发展具有里程碑意义，其生态完善。但是，它的构建是基于临时文件的，所以构建速度较慢，现在用的人越来越少了。

- Gulp

  Gulp 的构建是基于内存实现的，其构建速度比 Grunt 快，而且，Gulp 的生态也很完善，插件质量很高。目前最为流行。

- FIS

  FIS 是百度的前端团队对出的，最开始只在百度内部使用。开源后，逐渐在国内流行起来。但是其更新跟不上，最近的更新都是三年前的，而且其生态主要有国人维护（ Grunt 和 Gulp 生态是世界范围的 ）。所以，其流行度比不上 Gulp。

接下来，我们以 Gulp 为例，来讲解前端自动化构建工具。

![image-20201026150152038](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201026150152038.png)



### Gulp

Gulp 是基于 **流** 的自动化构建系统。

Gulp 的特点

- 任务化

  - 所有的构建操作，在 gulp 中都称之为**任务**

- 基于流

  - gulp 中所有的文件操作，都是基于 **流** 方式进行 （ Gulp有一个自己的内存，通过指定 API 将源文件流到内存中，完成相应的操作后再通过相应的 API 流出去）

  

## 基础

使用 Gulp 之前，先在全局安装 gulp-cli （ Gulp 的命令行工具 ）

```javascript
# 全局安装 gulp 客户端
npm i -g gulp-cli 

# 验证安装是否成功
gulp -v
```

> 官网：https://gulpjs.com/



### 基本用法

Gulp 使用的基本逻辑是：先声明任务，再从命令行中执行任务；具体步骤如下：

1. 使用 Gulp 之前，先在全局安装 gulp-cli

   ```javascript
   # 安装 gulp 命令行工具
   npm i -g gulp-cli 
   
   # 验证安装是否成功
   gulp -v
   ```

2. 初始化项目

   ```javascript
   # 创建项目目录
   mkdir project-name
   
   # 进入项目目录
   cd project-name
   
   # 初始化项目
   npm init --yes
   ```

3. 安装 Gulp 包

   ```javascript
   # 安装 gulp 包，作为开发时依赖项
   npm i gulp -D
   ```

4. 创建 gulpfile 文件

   gulpfile 文件是项目根目录下的 `gulpfile.js`，**在运行 `gulp` 命令时会被自动加载**。在这个文件中，你经常会看到类似 `src()`、`dest()`、`series()` 或 `parallel()` 函数之类的 Gulp API，除此之外，纯 JavaScript 代码或 Node.js 模块也会被使用。任何导出（ exports ）的函数都将注册到 Gulp 的任务（task）系统中。

   ```javascript
   # 创建任务，任务结束后，需要通过回调函数去标记
   exports.foo = () => {
     console.log('foo task is running')
   }
   ```

   > 报错：
   >
   > The following tasks did not complete: task
   > Did you forget to signal async completion?
   >
   > 解释：**在最新的 Gulp 中，取消了同步代码模式。约定每个任务都必须是一个异步任务**
   >
   > 解决：再函数参数中，设定回调函数（回调函数是异步操作）

5. 在 gulpfile.js 中注册 Gulp 任务

   ```javascript
   # 创建任务，并导出任务
   exports.foo = cb => {
     console.log('foo task is running')
       
     cb()
   }
   
   # 旧版 Gulp 注册任务的语法（无需执行导出操作）
   gulp.task('foo', function(cb) {
     console.log('foo task is running')
       
     cb()
   });
   ```

6. 运行 Gulp 任务

   ```javascript
   # 运行 foo 任务
   # 如需运行多个任务（task），可以执行 gulp <task> <othertask>
   gulp foo
   ```

7. 创建默认任务

   ```javascript
   # 默认任务的名称是 default
   exports.default = cb => {
       console.log('default task is running')
       
       cb()
   }
   
   # 运行默认任务, gulp 后无需指定任务名称
   gulp # 效果等同于 gulp default
   ```

   

### 组合任务

Gulp 提供了两个强大的组合方法： `series()` 和 `parallel()`

如果需要让任务（task）按顺序执行，请使用 `series()` 方法（相当于 npm scripts 中的 && ）。

如果希望任务（tasks）并行执行，可以使用 `parallel()` 方法将它们组合起来（相当于 npm scripts 中的 & ）。

```javascript
const gulp = require('gulp')

const task1 = cb => {
  setTimeout(() => {
    console.log('Task 1 is running')
    cb()
  }, 1000)
}

const task2 = cb => {
  setTimeout(() => {
    console.log('Task 2 is running')
    cb()
  }, 1000)
}

const task3 = cb => {
  setTimeout(() => {
    console.log('Task 3 is running')
    cb()
  }, 1000)
}

# 串行方式执行任务，先执行task1， 然后执行task2， 然后执行task3
exports.foo = gulp.series(task1, task2, task3)

# 并行方式执行任务，同时执行task1，task2，task3
exports.bar = gulp.parallel(task1, task2, task3)

# 执行命令
gulp foo # 串行执行
gulp bar # 并行执行
```

`series()` 和 `parallel()` 可以被嵌套到任意深度。通过这两个函数，构建任务可以被任意排列组合，从而满足各种复杂的构建需求。



### 文件操作

gulp 暴露了 `src()` 和 `dest()` 方法用于处理计算机上存放的文件。在代码构建过程中，需要将源文件，写入到目标目录。

```javascript
# 通过 解构 的方式引入 gulp 中的函数
const { src, dest } = require('gulp')

exports.default = () => {
  // 文件操作
  // 将 src/styles 目录下的 main.css 文件，复制到 dist/styles 目录下
  return src('src/styles/main.less', { base: 'src' }).pipe(dest('dist'))
}

# 执行命令
gulp default
# 或直接执行
gulp
```

![image-20200915165939940](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20200915165939940.png)



## 案例演示

### 样式文件构建

对样式文件进行转换、压缩、重命名。

```javascript
# 安装相关的 Gulp 插件
npm i gulp-less -D
npm i gulp-autoprefixer -D
npm i gulp-clean-css -D
npm i gulp-rename -D

# 在 gulpfile.js 中添加样式编译内容
const gulp = require('gulp')
const less = require('gulp-less')
// 给 CSS 属性添加前缀的插件（详情请看下方 CSS Hack）
const autoprefixer = require('gulp-autoprefixer')
// 压缩 CSS 的插件
const cleanCss = require('gulp-clean-css')
// 重命名转换文件的插件
const rename = require('gulp-rename')

const style = () => {
  return src('src/styles/*.less', { base: 'src' })
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(dest('dist'))
}

module.exports = {
  style
}

# 运行命令
npm gulp style
```

通过样式文件的构建，我们可以更清晰的理解文件操作。



> **CSS Hack**
>
> 由于不同浏览器中的渲染引擎不同，这导致了同一段 CSS 代码，在不同的浏览器上解析效果不同（即 CSS 代码具有兼容性问题）。
>
> ![image-20201026144548928](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201026144548928.png)
>
> **针对不同浏览器，写不同 CSS 代码的过程称为 CSS Hack**。
>
> CSS Hack 有三种形式：CSS 属性 Hack、CSS选择符 Hack 和 IE条件注释 Hack（ Hack主要针对IE浏览器 ）
>
> - 属性级 Hack
>
>   比如 IE6 能识别下划线“`_`”和星号“`*`”，IE7 能识别星号“`*`”，但不能识别下划线”`_` ”
>
> - 选择符级 Hack
>
>   IE6 能识别 `*html .class{}`
>
>   IE7 能识别 `*+html .class{}` 或者 `*:first-child+html .class{}`
>
> - IE 条件注释 Hack：
>
>   ```javascript
>   # 针对 IE6 及以下版本：
>   <!--[if lt IE 6]>您的代码<![endif]-->
>   ```
>   
>   这类 Hack 不仅对 CSS 生效，对写在判断语句里面的所有代码都会生效。
> 
>**本小节，只讨论属性级 Hack**
> 
>不同浏览器的 CSS 属性前缀：
> 
>![image-20201026144054470](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201026144054470.png)
> 
>例如：use-select 存在兼容性问题。CSS 属性 Hack 的解决方案如下：
> 
>![image-20201026144819759](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201026144819759.png)
> 
>上述添加 CSS 属性前缀的操作，之前是通过程序员手动添加的。这类重复性操作，我们可以通过插件完成。
> 
>在 Gulp 中 gulp-autoprefixer 插件，可以根据 caniuse.com 上提供的 CSS 兼容性数据，自动地给 CSS 属性加前缀，以保证 CSS 代码的兼容性问题。



### 脚本文件构建

对 JS 代码进行 Babel 转换和压缩。

> 注意：因为不同 babel 版本对应的 gulp-babel 的安装命令不同，所以安装 gulp-babel 之前需要先确定本地 babel 版本 （通过 babel --version 查看）
>
> ```
> # Babel 7
> $ npm install --save-dev gulp-babel @babel/core @babel/preset-env
> 
> # Babel 6
> $ npm install --save-dev gulp-babel@7 babel-core babel-preset-env
> ```

```javascript
# 我本地的 babel 版本是 6，所以，执行 6 的安装命令
npm install --save-dev gulp-babel@7 babel-core babel-preset-env

# 安装压缩脚本的插件
npm i gulp-uglify -D

# 在 gulpfile.js 中添加脚本编译内容
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const script = () => {
  return src('src/scripts/*.js', { base: 'src' })
    .pipe(babel({
      presets: [ 'babel-preset-env' ] // 不同版本的 babel，其转换规则写法也不同
  	}))
    .pipe(uglify())
    .pipe(rename({ "extname": ".min.js" }))
    .pipe(dest('dist'))
}

module.exports = {
  style,
  script
}

# 运行命令
gulp script
```



### 页面模板构建

对 html 文件的构建，主要指压缩 html 文件。其中 gulp-htmlmin 插件可以完成压缩任务。

> gulp-htmlmin 插件的解析器是：https://github.com/kangax/html-minifier
>
> 想要查看 htmlmin 的使用参数，可以查看上述链接。

```javascript
# 添加 htmlmin 插件
npm i gulp-htmlmin -D

# 在 gulpfile.js 中添加页面处理内容
const htmlmin = require('gulp-htmlmin')

const html = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(htmlmin({
      collapseWhitespace: true, // 去除标签之间多余的空行和空白
      minifyCSS: true, // 压缩HTML中的CSS代码
      minifyJS: true // 压缩HTML中的JS代码
    }))
    .pipe(dest('temp'))
}

module.exports = {
  style,
  script,
  html
}

# 运行命令
gulp html
```



完成上述三个构建任务后，我们可以将 style，script 和 html 任务组合起来。因为 style，script 和 html 之间没有明确的前后顺序，所以，可以进行并行执行，并行执行可以提升构建效率。

```javascript
# 引入 parallel 函数
const { src, dest, parallel } = require('gulp')

// 任务的并行执行
const build = parallel(style, script, html)

module.exports = {
  build
}

# 运行命令
gulp build
```



### 图片（字体）文件转换

对图片文件的构建，主要是指图片的压缩。通过 gulp-imagemin 插件可以完成图片的压缩任务。

```javascript
# 安装 imagemin 插件
npm i gulp-imagemin -D

# 在 gulpfile.js 中引入图片压缩插件
const imagemin = require('gulp-imagemin')

// 图片构建任务
const image = () => {
  return src('src/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

// 图片构建任务，也可以与以上三个任务一起，并行执行
const build = parallel(style, script, html, image)

module.exports = {
  image,
  build
}

# 运行命令
gulp build
```

> 报错处理：
>
> gulp-imagemin: Couldn't load default plugin "gifsicle"
>
> gulp-imagemin: Couldn't load default plugin "optipng"
>
> 原因：npm 安装依赖失败
>
> 解决：
>
> 1. 配置 hosts (详情参考本节最后的**附录**部分)
> 2. 重新安装 npm i gulp-imagemin -D



### 文件清除

有时候，我们需要删除一些构建的历史文件，然后再重新构建。删除文件操作，可以通过 del 插件完成。

```javascript
# 通过del插件来删除指定文件
npm i del -D

const del = require('del')

// 声明清除任务
const clean = () => {
  return del(['dist'])
}

// 编译之前，先执行clean，删除历史文件
const build = parallel(style, script, html, image)
const dev = series(clean, build)

module.exports = {
  clean,
  dev
}

# 运行命令，查看文件是否删除
gulp clean
# 或者
gulp dev
```



### 开发服务器

通过web服务器插件，将 dist 下的代码，发布到浏览器查看效果。发布web服务的插件有很多。这里，我们推荐功能强大的 browser-sync。

<img src="C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201026115412063.png" alt="image-20201026115412063" style="zoom:67%;" />

```javascript
# 安装 browser-sync 插件
npm i browser-sync -D

# 在 gulpfile.js 中添加开发服务器的内容
const browserSync = require('browser-sync')
const bs = browserSync.create()

// 声明 web 服务构建任务
const serve = () => {
  bs.init({
    server: {
      baseDir: './dist' // 指定服务启动的目录
      routes: {
        '/node_modules': 'node_modules' // 引入 Bootstrap 是设置路径映射
      }
    }
  })
}

module.exports = {
  clean,
  build，
  serve
}

# 运行命令，然后在浏览器查看效果
gulp serve
```

> 服务发布成功后，之前学习的内容，也可以拿过来使用，例如：Bootstrap
>
> 1. 下载插件
>
>    ```javascript
>    # 因为 Bootstrap 和 jQuery 上线之后还要使用，所以，采用 -S 参数（上线依赖）
>    npm i bootstrap@3.4.1 jquery -S
>    ```
>
> 2. 引入文件
>
>    Bootstrap 和 jQuery 下载后，文件位于当前目录的 node_modules 下
>
>    ```html
>    # 在 HTML 中引入
>    <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
>    ......
>    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
>    <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
>    ```
>
>    **引入路径，需要在 browser-sync 中，通过 routes 参数映射后，才能正确引入**（详情查看上述代码）
>
> 3. 使用 Bootstrap
>
>    之前学习的 Bootstrap 的代码，都可以在当前代码中使用。



### 监视变化（热更新）

监视 src 下文件变化的页面更新，代码一旦更新，浏览器上的页面效果也随之更新。

此时，我们需要监视两个目录的变化，一个是 dist 目录，一个是 src 目录。

<img src="C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201026115302892.png" alt="image-20201026115302892" style="zoom:67%;" />

- 监视 dist 目录下代码的变化

  ```javascript
  # 通过 browser-sync 中的 files 字段
  files: 'dist/**'
  ```

- 监视 src 目录下代码的变化

  ```javascript
  # 通过 gulp 中的 watch 函数
  watch(被监视的文件，对应的任务)
  ```

最终的代码如下：

```javascript
# 在 gulpfile.js 中添加监视文件变化的代码
const serve = () => {
  // watch(被监视的文件，对应的任务)
  watch('src/index.html', html)
  watch('src/styles/*.less', style)
  watch('src/js/*.js', script)
  watch('src/images/**', image)

  // 初始化服务
  bs.init({
    notify: false,      // 禁用浏览器右上角的 browserSync connected 提示框
    files: 'dist/**',   // 监视 dist 下 文件的变化，然后在浏览器上实时更新
    server: {
      baseDir: './dist', // 指定服务启动的目录
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

// 组合任务
const build = parallel(style, script, html, image)
const dev = series(clean, build, serve)

// 导出任务
module.exports = {
  build,
  dev,
  serve
}

# 运行命令，更新代码文件，查看页面变化
gulp dev
```

此时，不管是 dist 目录下，还是 src 目录下。只要代码发生变化，我们就可以在浏览器上实时看到效果。















## 附录

### 1. Win10 配置 hosts

 1. 通过vscode 打开 hosts 文件

    ```bash
    # hosts 文件的路径
    C:\Windows\System32\Drivers\etc
    ```

    ![image-20201006182128887](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201006182128887.png)

 2. 添加 Guthub 相关的内容

    将下面的内容复制，然后追加到 hosts 文件的尾部

    ```
    # GitHub Start (chinaz.com) =================================================
    13.229.188.59 github.com
    54.169.195.247 api.github.com
    140.82.113.25 live.github.com
    8.7.198.45 gist.github.com
    
    # 185.199.108.154 github.githubassets.com
    # 185.199.109.154 github.githubassets.com
    185.199.110.154 github.githubassets.com
    # 185.199.111.154 github.githubassets.com
    
    34.196.247.240 collector.githubapp.com
    # 52.7.232.208 collector.githubapp.com
    52.216.92.163 github-cloud.s3.amazonaws.com
    
    199.232.96.133 raw.githubusercontent.com
    151.101.108.133 user-images.githubusercontent.com
    
    151.101.108.133 avatars.githubusercontent.com
    151.101.108.133 avatars0.githubusercontent.com
    151.101.108.133 avatars1.githubusercontent.com
    151.101.108.133 avatars2.githubusercontent.com
    151.101.108.133 avatars3.githubusercontent.com
    151.101.108.133 avatars4.githubusercontent.com
    151.101.108.133 avatars5.githubusercontent.com
    151.101.108.133 avatars6.githubusercontent.com
    151.101.108.133 avatars7.githubusercontent.com
    151.101.108.133 avatars8.githubusercontent.com
    151.101.108.133 avatars9.githubusercontent.com
    151.101.108.133 avatars10.githubusercontent.com
    151.101.108.133 avatars11.githubusercontent.com
    151.101.108.133 avatars12.githubusercontent.com
    151.101.108.133 avatars13.githubusercontent.com
    151.101.108.133 avatars14.githubusercontent.com
    151.101.108.133 avatars15.githubusercontent.com
    151.101.108.133 avatars16.githubusercontent.com
    151.101.108.133 avatars17.githubusercontent.com
    151.101.108.133 avatars18.githubusercontent.com
    151.101.108.133 avatars19.githubusercontent.com
    151.101.108.133 avatars20.githubusercontent.com
    # GitHub End ===================================================================
    
    ```

 3. 保存文件

    ctrl+s 保存，此时如果报：没有权限，点击以管理员身份重试

    ![image-20201006182306289](C:\Users\changtaoliu\AppData\Roaming\Typora\typora-user-images\image-20201006182306289.png)

    

### 2. Mac 配置 hosts

1. 打开终端

2. 输入 sudo vi /etc/hosts 

3. 输入密码

4. 进入文件 hosts，然后按 “i”，进入编辑模式

5. 把你的内容添加到最后

   ```
   # GitHub Start (chinaz.com) =================================================
   13.229.188.59 github.com
   54.169.195.247 api.github.com
   140.82.113.25 live.github.com
   8.7.198.45 gist.github.com
   
   # 185.199.108.154 github.githubassets.com
   # 185.199.109.154 github.githubassets.com
   185.199.110.154 github.githubassets.com
   # 185.199.111.154 github.githubassets.com
   
   34.196.247.240 collector.githubapp.com
   # 52.7.232.208 collector.githubapp.com
   52.216.92.163 github-cloud.s3.amazonaws.com
   
   151.101.108.133 raw.githubusercontent.com
   151.101.108.133 user-images.githubusercontent.com
   
   151.101.108.133 avatars.githubusercontent.com
   151.101.108.133 avatars0.githubusercontent.com
   151.101.108.133 avatars1.githubusercontent.com
   151.101.108.133 avatars2.githubusercontent.com
   151.101.108.133 avatars3.githubusercontent.com
   151.101.108.133 avatars4.githubusercontent.com
   151.101.108.133 avatars5.githubusercontent.com
   151.101.108.133 avatars6.githubusercontent.com
   151.101.108.133 avatars7.githubusercontent.com
   151.101.108.133 avatars8.githubusercontent.com
   151.101.108.133 avatars9.githubusercontent.com
   151.101.108.133 avatars10.githubusercontent.com
   151.101.108.133 avatars11.githubusercontent.com
   151.101.108.133 avatars12.githubusercontent.com
   151.101.108.133 avatars13.githubusercontent.com
   151.101.108.133 avatars14.githubusercontent.com
   151.101.108.133 avatars15.githubusercontent.com
   151.101.108.133 avatars16.githubusercontent.com
   151.101.108.133 avatars17.githubusercontent.com
   151.101.108.133 avatars18.githubusercontent.com
   151.101.108.133 avatars19.githubusercontent.com
   151.101.108.133 avatars20.githubusercontent.com
   # GitHub End ===================================================================
   
   ```

6. control+c 退出编辑模式

7. 输入 :wq，保存退出

