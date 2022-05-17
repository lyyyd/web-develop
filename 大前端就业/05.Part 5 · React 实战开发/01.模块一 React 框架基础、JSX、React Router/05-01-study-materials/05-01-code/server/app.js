const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// 用户信息
const users = [{
    id: 1,
    name: '张三',
    age: 20,
    sex: '男'
}, {
    id: 2,
    name: '李四',
    age: 15,
    sex: '男'
}, {
    id: 3,
    name: '王五',
    age: 18,
    sex: '男'
}, {
    id: 4,
    name: '苏大强',
    age: 50,
    sex: '男'
}, {
    id: 5,
    name: '苏明成',
    age: 28,
    sex: '男'
}, {
    id: 6,
    name: '苏明哲',
    age: 30,
    sex: '男'
}, {
    id: 7,
    name: '苏明玉',
    age: 26,
    sex: '女'
}, {
    id: 8,
    name: '吴菲',
    age: 29,
    sex: '女'
}]

// 欢迎信息 GET
app.get('/api/welcome', (req, res) => {
    res.send({
        msg: 'Hello 服务器端已经接受到了这个GET请求'
    });
});

// 欢迎信息 POST
app.post('/api/welcome', (req, res) => {
    res.send({
        msg: 'Hello 服务器端已经接受到了这个POST请求'
    });
});

// 获取用户信息
app.get('/api/getUsers', (req, res) => {
    res.send(users);
});

// 根据[id]获取用户信息
app.get('/api/getUserById', (req, res) => {
    // 用户id
    const id = req.query.id;
    // 成功: 用户信息对象 失败: undefined
    const user = users[id];
    res.send(user);
})

// 添加用户
app.post('/api/addUser', (req, res) => {
    // 获取用户信息
    const user = req.body;
    // 根据id查找用户
    const result = users.find(item => item.id == user.id);
    // 验证id
    if (!user.id) {
        res.status(400).send({
            msg: '请添加用户id'
        })
    }else if (result) {
        // 验证用户是否已存在
        res.status(400).send({
            msg: '用户已存在'
        });
    }else {
        // 添加用户
        users.push(user);
        // 响应
        res.send({
            msg: '用户添加成功'
        });
    }
    
});

// 根据[id]删除用户
app.delete('/api/deleteUserById', (req, res) => {
    // 获取用户id
    const id = req.query.id;
    // 查找用户索引
    const index = users.findIndex(item => item.id == id);
    // 删除用户
    users.splice(index, 1);
    // 响应
    res.send({
        msg: '用户删除成功'
    });
});

// 根据[id]修改用户信息
app.put('/api/modifyUserById', (req, res) => {
    // 获取用户id
    const id = req.body.id;
    // 根据id查找用户索引
    const index = users.findIndex(item => item.id == id);
    // 修改用户信息
    if (index <= users.length - 1) {
        // 成功
        users.splice(index, 1, req.body);
        // 响应
        res.send({
            msg: '用户信息修改成功'
        })
    }else {
        // 失败
        res.status(400).send({
            msg: '用户信息修改失败, 无此用户'
        })
    }
});

// 返回错误的请求
app.get('/api/getError', (req, res) => {
    res.status(400).send({msg: '发生了未知错误'});
})

app.listen(3005, () => console.log('服务器启动成功 请访问localhost:3005'));