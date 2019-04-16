import { get, post } from '../utils/request'
import { getToken } from '@/utils/auth'
import { serverUrl } from '@/utils/config'

export function getProductList(payload) {
  return get(`${serverUrl}/api/v1/admin/products`, {
    headers: {
      authorization: `Bearer ${getToken()}`
    },
    params: payload
  })
}

export function createProduct(payload) {
  return post(`${serverUrl}/api/v1/admin/products`, payload, {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  })
}
