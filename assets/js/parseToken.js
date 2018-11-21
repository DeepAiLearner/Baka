export default ctx => {
  const isClient = typeof window !== 'undefined'
  if (isClient && window.__JWT_TOKEN__) {
    return window.__JWT_TOKEN__
  }
  const cookies = ctx
    ? isClient
      ? document.cookie
      : ctx.req.headers.cookie
    : ''
  if (!cookies) {
    return ''
  }
  let token = ''
  cookies.split('; ').forEach(item => {
    const temp = item.split('=')
    if (temp[0] === 'JWT-TOKEN') {
      token = temp[1]
    }
  })
  if (isClient) {
    window.__JWT_TOKEN__ = token
  }
  return token
}
