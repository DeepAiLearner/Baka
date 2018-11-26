export default (err, timeout) => {
  if (err.message === `timeout of ${timeout}ms exceeded`) {
    err.statusCode = 0
    err.message = '网路请求超时，请稍候再试！'
    return err
  }
  if (!err.response) {
    err.statusCode = 1
    err.message = '网络错误，请刷新网页重试！'
    return err
  }
  err.statusCode = err.response.status
  err.message = err.response.data.message
  return err
}
