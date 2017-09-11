// import {
//   LOGIN,
//   LOGOUT,
// } from '../actions'
export default (state = {
  id: 'xxx',
  name: '陈亮',
  tel: '',
}, action) => {
  const {
    type,
    ...other,
  } = action
  switch(type){
    case 'LOGIN':
      return {
        ...state,
        ...other,
      }
    case 'LOGOUT':
      return {
        ...state,
        ...other,
      }
    default:
      return state
  }
}