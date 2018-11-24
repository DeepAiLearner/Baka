export default req => {
  const isClient = typeof window !== 'undefined'
  const cookies = isClient ? document.cookie : req ? req.headers.cookie : ''
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
  return token
}
