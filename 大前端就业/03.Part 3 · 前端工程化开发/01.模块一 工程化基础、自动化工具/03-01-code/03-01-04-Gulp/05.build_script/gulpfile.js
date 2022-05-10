// 通过 解构 的方式引入函数
const { src, dest } = require('gulp')
const less = require('gulp-less')
const cleancss = require('gulp-clean-css')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

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

// 导出任务
module.exports = {
  style,
  script
}