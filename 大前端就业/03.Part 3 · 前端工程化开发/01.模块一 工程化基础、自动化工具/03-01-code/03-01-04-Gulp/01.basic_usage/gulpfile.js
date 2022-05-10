const gulp = require('gulp')

// 创建 gulp 任务
const task1 = (cb) => {
  console.log('Task 1 is running')

  cb()
}

const task2 = (cb) => {
  console.log('Task 2 is running')

  cb()
}

// 旧版声明任务的语法
gulp.task('task3', (cb) => {
  console.log('Task 3 is running')

  cb()
})

// 导出任务
module.exports = {
  task1,
  default: task2 // 默认任务
}