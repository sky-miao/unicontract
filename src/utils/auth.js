export function checkAuth(auths, path) {
  if (!auths || !auths.length || !path) {
    return false
  }
  let res = auths.filter((auth, index) => {
    return auth.drn === path
  })

  return !!(res && res.length)
}