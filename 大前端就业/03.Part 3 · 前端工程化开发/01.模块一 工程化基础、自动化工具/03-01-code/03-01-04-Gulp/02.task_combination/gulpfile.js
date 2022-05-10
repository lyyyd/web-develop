// 引入 gulp
const gulp = require('gulp')

const task1 = (cb) => {
  setTimeout(() => {
    console.log('Task 1 is running')

    cb()
  }, 1000)
}

const task2 = (cb) => {
  setTimeout(() => {
    console.log('Task 2 is running')

    cb()
  }, 1000)
}

const task3 = (cb) => {
  setTimeout(() => {
    console.log('Task 3 is running')

    cb()
  }, 1000)
}

// 任务的并行执行
exports.p = gulp.parallel(task1, task2, task3)

// 任务的串行执行
exports.s = gulp.series(task1, task2, task3)
