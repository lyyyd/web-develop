## Todos案例接口文档

基础URL地址：http://localhost:3005/api

POST、PUT 请求参数的类型为application/json

### 1. 获取任务列表

| 请求地址 | 请求方式 |
| -------- | -------- |
| /todos   | GET      |

```javascript
[{
    taskName: '吃饭',
    isCompleted: false,
    isEditing: false
}, {
    taskName: '睡觉',
    isCompleted: false,
    isEditing: false
}, {
    taskName: '打豆豆',
    isCompleted: false,
    isEditing: false
}]
```



### 2. 添加任务

| 请求地址 | 请求方式 |
| -------- | -------- |
| /todos   | POST     |

| 参数名称 | 含义     |
| -------- | -------- |
| taskName | 任务名称 |

```javascript
{
    "msg": "任务添加成功",
    "task": {
      	"id": 4,
        "taskName": "敲代码",
        "isCompleted": false,
        "isEditing": false
    }
}
```



### 3. 根据id删除任务

| 请求地址 | 请求方式 |
| -------- | -------- |
| /todos   | DELETE   |

| 参数名称 | 含义   |
| -------- | ------ |
| id       | 任务id |

```javascript
{
    "msg": "任务删除成功",
    "task": {
       id: 3,
       taskName: '打豆豆',
       isCompleted: false,
       isEditing: false
    }
}
```



### 4. 根据id修改任务名称

| 请求地址 | 请求方式 |
| -------- | -------- |
| /todos   | PUT      |

| 参数名称 | 含义     |
| -------- | -------- |
| id       | 任务id   |
| taskName | 任务名称 |

```javascript
{
    "msg": "任务名称修改成功",
    "task": {
      id: 1,
      taskName: '吃饭',
      isCompleted: false,
      isEditing: false
		}
}
```



### 5. 更改任务的完成状态(单个)

| 请求地址           | 请求方式 |
| ------------------ | -------- |
| /todos/isCompleted | PUT      |

| 参数名称    | 含义               |
| ----------- | ------------------ |
| id          | 任务id             |
| isCompleted | 任务是否完成的状态 |

```javascript
{
    "msg": "任务是否完成状态修改成功",
    "task": {
      id: 1,
      taskName: '吃饭',
      isCompleted: true,
      isEditing: false
		}
}
```



### 6. 批量更改任务是否完成状态

| 请求地址            | 请求方式 |
| ------------------- | -------- |
| /todos/allCompleted | PUT      |

| 参数名称 | 含义     |
| -------- | -------- |
| status   | 任务状态 |

```javascript
[{
    taskName: '吃饭',
    isCompleted: false,
    isEditing: false
}, {
    taskName: '睡觉',
    isCompleted: false,
    isEditing: false
}, {
    taskName: '打豆豆',
    isCompleted: false,
    isEditing: false
}]
```



### 7. 更改任务的编辑状态

| 请求地址         | 请求方式 |
| ---------------- | -------- |
| /todos/isEditing | PUT      |

| 参数名称  | 含义               |
| --------- | ------------------ |
| id        | 任务id             |
| isEditing | 任务是否编辑的状态 |

```javascript
{
    "msg": "任务的编辑状态修改成功",
    "task": {
      id: 1,
      taskName: '吃饭',
      isCompleted: false,
      isEditing: true
		}
}
```



### 8. 清除已完成任务

| 请求地址              | 请求方式 |
| --------------------- | -------- |
| /todos/clearCompleted | delete   |

```javascript
{msg: '已完成任务清除完成'}
```

