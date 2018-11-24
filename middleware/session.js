export default ctx => {
  const { req, store } = ctx
  const isServer = typeof window === 'undefined'
  let token = ''
  if (isServer) {
    const cookies = req.headers.cookie
    if (!cookies) {
      ctx.session = ''
      return
    }
    cookies.split('; ').forEach(item => {
      const temp = item.split('=')
      if (temp[0] === 'JWT-TOKEN') {
        token = temp[1]
      }
    })
    ctx.session = token
    return
  }
  if (window.__JWT_TOKEN__) {
    ctx.session = window.__JWT_TOKEN__
    return
  }
  if (!store.state.login) {
    ctx.session = ''
    return
  }
  token = store.state.user.token
  window.__JWT_TOKEN__ = token
  ctx.session = token
}
