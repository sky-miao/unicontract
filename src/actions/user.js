import fetch from '../utils/fetch'
import config from '../config'
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO_SUCCESS = 'RECEIVE_USER_INFO_SUCCESS'
export const RECEIVE_USER_INFO_FAIL = 'RECEIVE_USER_INFO_FAIL'
export const RECEIVE_AUTH_INFO_SUEECESS = 'RECEIVE_AUTH_INFO_SUEECESS'

export function requestUserInfo() {
  return {
    type: REQUEST_USER_INFO,
  }
}

export function receiveUserInfoSuccess(userInfo) {
  return {
    type: RECEIVE_USER_INFO_SUCCESS,
    ...userInfo,
  }
}

export function receiveAuthInfoSuccess(userInfo) {
  return {
    type: RECEIVE_AUTH_INFO_SUEECESS,
    ...userInfo
  }
}

export function receiveUserInfoFail() {
  return {
    type: RECEIVE_USER_INFO_FAIL,
  }
}
//
//export function fetchUserInfo() {
//	return function() {
//		return fetch('http://172.17.7.109:9088/login').then(res) => {
//			if( res.code == 200 ){
//				var user={
//					"name"=
//				}
//			}
//		}
//	}
//}

export function fetchUserInfo() {
  return function(dispath) {
    dispath(requestUserInfo())
    return fetch('/platform-buyer/api/platform/page/getMenu').then((res) => {
      if (res && res.errorCode === 0) {
        let result = res.result
        let menues = result.menu.map((item) => {
            return  {
              name: item.title,
              key: item.className,
              link: item.list.length === 1 ? item.list[0].url : '',
              icon: '',
              subMenues: item.list.length > 1 ? item.list.map((sub, i) => {
                return {
                  name: sub.title,
                  key: sub.cur + i,
                  link: sub.url,
                  icon: '',
                }
              }) : null
            }
        })
        dispath(receiveUserInfoSuccess({
          user: {
            id: result.uid,
            name: result.userName,
          },
          role: {
            id: result.roleId,
            title: result.roleTitle,
          },
          menues: menues,
        }))
        if (result.roleId) {
          return fetch('/permission/role/queryDrns?appId=1&token=1&logId=1&roleId=' + result.roleId).then((ruthRes) => {
            if (ruthRes && ruthRes.errorCode === 0) {
              dispath(receiveAuthInfoSuccess({
                authes: ruthRes.drnInfos
              }))
            }
          })
        }
      }
    })
  }
}

export function logout(){
  console.log('logout')
  window.location = config.logoutUrl
}