import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { showMsgTip } from '@/utils/common'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload).then(response => {
          if (response.code === 'success') {
            const { token } = response
            setToken(token)
            commit('SET_TOKEN', token)
            resolve()
          } else {
            console.log(response)
            showMsgTip(response.message)
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    async GetInfo({ commit, state }) {
      const userInfo = await getInfo(getToken())
      commit('SET_NAME', userInfo.nickName)
      commit('SET_AVATAR', userInfo.avatar)
    },

    // 登出
    LogOut({ commit, state }) {
      removeToken()
      commit('SET_TOKEN', '')
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
