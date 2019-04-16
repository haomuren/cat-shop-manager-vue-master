import { post, get } from '@/utils/request'
import { serverUrl } from '@/utils/config'

export function login(payload) {
  return post(`${serverUrl}/api/v1/auth/manager_login`, payload)
}

export function getInfo(token) {
  return get(`${serverUrl}/api/v1/users/manager_info`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
}

export function logout() {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
}
