// 通过 解构 的方式引入函数
const { src, dest, parallel } = require('gulp')
const less = require('gulp-less')
const cleancss = require('gulp-clean-css')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')

// 声明 gulp 任务
const style = () => {
  // 流 就是异步操作
  return src('src/styles/main.less', { base: 'src' })
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(rename({ "extname": ".min.css" }))
    .pipe(dest('dist'))
}

// 声明 脚本 构建任务
const script = () => {
  return src('src/js/main.js')
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

// 组合任务
const build = parallel(style, script, html, image)

// 导出任务
module.exports = {
  style,
  script,
  html,
  build,
  image
}