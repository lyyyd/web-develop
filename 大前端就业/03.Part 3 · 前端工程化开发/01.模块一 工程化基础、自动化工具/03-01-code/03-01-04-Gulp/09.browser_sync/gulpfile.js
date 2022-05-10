// 通过 解构 的方式引入函数
const { src, dest, parallel, series, watch } = require('gulp')
const less = require('gulp-less')
const cleancss = require('gulp-clean-css')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const del = require('del')
const browserSync = require('browser-sync')
const bs = browserSync.create()

// 声明 gulp 任务
const style = () => {
  // 流 就是异步操作
  return src('src/styles/*.less', { base: 'src' })
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(rename({ "extname": ".min.css" }))
    .pipe(dest('dist'))
}

// 声明 脚本 构建任务
const script = () => {
  return src('src/js/*.js')
    .pipe(babel({
      presets: ['babel-preset-env']
    }))
    .pipe(uglify())
    .pipe(rename({ "extname": ".min.js" }))
    .pipe(dest('dist/scripts'))
}

// 声明 页面 的构建任务
const html = () => {
  return src('src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(dest('dist'))
}

// 声明 图片 构建任务
const image = () => {
  return src('src/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

// 声明 文件清除 任务
const clean = () => {
  return del(['dist'])
}

// 声明 服务发布 任务
const serve = () => {
  // watch(被监视的文件，对应的任务)
  watch('src/index.html', html)
  watch('src/styles/*.less', style)
  watch('src/js/*.js', script)
  watch('src/images/**', image)

  // 初始化服务
  bs.init({
    notify: false,      // 禁用 浏览器 右上角的 browserSync connected 提示框
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