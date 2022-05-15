import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储登录用户数据，尝试读取本地存储数据
    user: JSON.parse(window.localStorage.getItem('lagouedu-mobile-user') || null)
  },
  mutations: {
    // 用于修改 user
    setUser (state, payload) {
      // payload 为请求到的用户数据，JSON 格式不便操作，转换为对象存储
      state.user = JSON.parse(payload)
      // 将数据设置到本地存储，注意本地存储无法存储对象
      window.localStorage.setItem('lagouedu-mobile-user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
