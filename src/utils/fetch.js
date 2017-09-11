import {polyfill} from 'es6-promise'
import originFetch from 'isomorphic-fetch'
import Promise from 'promise'
import { message } from 'antd'
import  config from '../config'
polyfill()

const status_map = {}

export default function fetch(url, options) {
  if (status_map[url]) {
    return Promise.reject('OVER_CLICK') // 处理连续点击的问题！
  }
  status_map[url] = true
  return new Promise((resolve, reject) => {
    originFetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'same-origin',
      ...options,
    }).then((res) => {
      return res.json()
    }).then((res) => {
      status_map[url] = false
      if (res.errorCode === 80000) {
        window.location = `${config.loginUrl}?redirect=${window.location.href}`
      } else if (res.errorCode === 403) {
        message.error('您没有操作权限！')
        reject(res.errorCode)
      } else if (res.errorCode !== 0) {
        message.error(res.errorMsg)
        reject(res.errorCode)
      } else {
        resolve(res)
      }
    }).catch((e) => {
      status_map[url] = false
      message.error('服务端异常！')
      throw e
    })
  })
}