import { Message } from 'element-ui'

/**
 * 弹出错误提示
 * @param {*} txt
 */
export function showMsgTip(txt) {
  Message.error(txt)
}
