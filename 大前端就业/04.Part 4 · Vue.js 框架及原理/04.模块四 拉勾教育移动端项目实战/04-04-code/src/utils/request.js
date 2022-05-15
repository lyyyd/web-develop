import axios from 'axios'
import store from '@/store'
import qs from 'qs'

const request = axios.create({
  baseURL: 'http://edufront.lagou.com'
})

// 设置请求拦截器进行接口鉴权
request.interceptors.request.use(config => {
  // 读取 store 中存储的 user 数据
  const { user } = store.state
  // 检测 user 是否存在数据，如果有，则进行 token 设置
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 存储是否正在更新 Token 的状态
let isRefreshing = false
// 存储因为等待 Token 刷新而挂起的请求
let requests = []
// 响应拦截器刷新 Token
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response) {
    const { status } = error.response
    if (status === 400) {
    } else if (status === 401) {
      if (!store.state.user) {
        return Promise.reject(error)
      }
      // 检测是否已经存在了正在刷新 Token 的请求
      if (isRefreshing) {
        // 将当前失败的请求，存储到请求列表中
        return requests.push(() => {
          // 当前函数调用后，会自动发送本次失败的请求
          request(error.config)
        })
      }
      isRefreshing = true
      // 发送请求，获取新的 access_token
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // - 刷新 token 失败
        if (res.data.state !== 1) {
          // 清除无效的用户信息
          store.commit('setUser', null)
          return Promise.reject(error)
        }
        // 刷新 token 成功
        //  - 存储新的 token
        store.commit('setUser', res.data.content)
        //  - 重新发送失败的请求（根据 requests 发送所有失败的请求）
        requests.forEach(callback => callback())
        //  - 发送完毕，清除 requests 内容即可
        requests = []
        //  - 将本次请求发送
        return request(error.config)
      }).finally(() => {
        // 请求发送完毕，响应处理完毕，将刷新状态更改为 false 即可
        isRefreshing = false
      })
    }
  }
  // 将本次请求的错误对象继续向后抛出，让接收响应的处理函数进行操作
  return Promise.reject(error)
})

export default request
