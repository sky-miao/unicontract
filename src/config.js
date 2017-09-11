export default {
  loginUrl: process.env.NODE_ENV === 'development' 
    ? '/common-platform/login'
    : process.env.NODE_ENV === 'test'
      ? 'https://test-a.asean-go.com/common-platform/login'
      : 'https://a.asean-go.com/common-platform/login',
  logoutUrl: process.env.NODE_ENV === 'development' 
    ? '/common-platform/logout'
    : process.env.NODE_ENV === 'test'
      ? 'https://test-a.asean-go.com/common-platform/logout'
      : 'https://a.asean-go.com/common-platform/logout',
}