export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const login = (opts) => {
  return {
    ...opts,
    type: LOGIN,
  }
}
export const logout = (opts) => {
  return {
    type: LOGOUT,
  }
}