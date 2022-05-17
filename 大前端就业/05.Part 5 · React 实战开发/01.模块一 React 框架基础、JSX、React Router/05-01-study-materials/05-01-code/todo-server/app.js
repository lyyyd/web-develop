const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let taskList = [{
    id: 1,
    taskName: '吃饭',
    isCompleted: false,
    isEditing: false
}, {
    id: 2,
    taskName: '睡觉',
    isCompleted: false,
    isEditing: false
}, {
    id: 3,
    taskName: '打豆豆',
    isCompleted: false,
    isEditing: false
}];

// 获取任务列表
app.get('/api/todos', (req, res) => {
    res.send(taskList);
});

// 添加任务
app.post('/api/todos', (req, res) => {
    const ids = taskList.map(task => task.id);
    if (ids.length == 0) {
        req.body.id = 0;
    } else {
        const maxId = Math.max.apply(null, ids);
        req.body.id = maxId + 1;
    }
    req.body.isCompleted = false;
    req.body.isEditing = false;
    taskList.push(req.body);
    res.send({ msg: '任务添加成功', task: req.body });
});
// 删除任务
app.delete('/api/todos', (req, res) => {
    const id = req.query.id;
    const index = taskList.findIndex(task => task.id == id);
    const clone = JSON.parse(JSON.stringify(taskList[index]));
    taskList.splice(index, 1);
    res.send({ msg: '任务删除成功', tasks: clone });
});
// 修改任务名称
app.put('/api/todos', (req, res) => {
    const { id, taskName } = req.body;
    const index = taskList.findIndex(task => task.id == id);
    if (index == -1 || taskName == undefined) {
        res.status(400).send({ msg: '参数传递有误' });
        return;
    }
    taskList[index].taskName = taskName;
    res.send({ msg: '任务名称修改成功', task: taskList[index] });
});
// 更改任务的完成状态(单个)
app.put('/api/todos/isCompleted', (req, res) => {
    const { id, isCompleted } = req.body;
    const index = taskList.findIndex(task => task.id == id);
    taskList[index].isCompleted = isCompleted;
    res.send({ msg: '任务是否完成状态修改成功', task: taskList[index] });
});
// 批量更改任务是否完成状态
app.put('/api/todos/allCompleted', (req, res) => {
    const { status } = req.body;
    const newTaskList = taskList.map(task => {
        task.isCompleted = status;
        return task;
    });
    taskList = newTaskList;
    res.send(taskList);
});
// 更改任务的编辑状态
app.put('/api/todos/isEditing', (req, res) => {
    const { id, isEditing } = req.body;
    const index = taskList.findIndex(task => task.id == id);
    taskList[index].isEditing = isEditing;
    res.send({ msg: '任务的编辑状态修改成功', task: taskList[index] });
});
// 清除已完成任务
app.delete('/api/todos/clearCompleted', (req, res) => {
    taskList = taskList.filter(todo => !todo.isCompleted)
    res.send({ msg: '已完成任务清除完成' })
});

app.listen(3005, () => console.log('服务器启动成功'));