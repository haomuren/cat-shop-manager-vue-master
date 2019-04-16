import axios from 'axios'

const instance = axios.create()

instance.interceptors.response.use(function(res) {
  return res.data // 返回结果进行数据解析,直接返回服务器输出的数据
}, function(error) {
  if (error.response && error.status === 401) {
    // 跳转登录页面
    // console.log('未授权') //
    window.location.reload() // 重新加载页面, 在权限判断permission.js中的路由钩子函数中做跳转处理
  }
})

export function get(url, config) {
  return instance.get(url, config)
}

export function post(url, data, config) {
  return instance.post(url, data, config)
}

export function put(url, data, config) {
  return instance.put(url, data, config)
}

export function del(url, config) {
  return instance.delete(url, config)
}
