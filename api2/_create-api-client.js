import axios from 'axios'

const timeout = 15000
const pendingQueue = {}
const createRequestKey = (url, params = {}) => {
  if (!params) {
    return `GET-${url}`
  }
  url += `GET-${url}?`
  Object.keys(params).forEach(key => {
    url += `${key}=${params[key]}&`
  })
  return url.slice(0, -1)
}
const makeAuthHeader = params => {
  let headers = {}
  if (params && params.session) {
    headers.Authorization = `Bearer ${params.session}`
  }
  return headers
}

export default new class {
  constructor() {
    const http = axios.create({
      baseURL: process.env.baseUrl,
      headers: {
        Accept: 'application/x.api.latest+json'
      },
      timeout: timeout
    })

    http.interceptors.response.use(
      res => res.data.data,
      err => {
        if (err.message === `timeout of ${timeout}ms exceeded`) {
          return Promise.reject({
            code: 0,
            message: '网路请求超时，请稍候再试！'
          })
        }
        try {
          if (!err.response) {
            return Promise.reject({
              code: 1,
              message: '网络错误，请刷新网页重试！'
            })
          }
          let message = err.response.data.message
          const code = err.response ? err.response.status || 500 : 500
          if (typeof message === 'string') {
            return Promise.reject({
              code,
              message
            })
          }
          return Promise.reject({
            code,
            message: message[Object.keys(message)[0]][0]
          })
        } catch (e) {
          console.error(e)
        }
      }
    )

    this.instance = http
  }

  get() {
    const url = arguments[0]
    const params = arguments[1] || {}
    return this.pending(url, params)
  }

  post() {
    const data = arguments[1]
    return this.instance({
      method: 'POST',
      url: arguments[0],
      data,
      headers: makeAuthHeader(data)
    })
  }

  pending(url, params) {
    const key = createRequestKey(url, params)
    if (pendingQueue[key]) {
      return new Promise((resolve, reject) => {
        pendingQueue[key].then(resolve).catch(reject)
      })
    }
    const task = new Promise((resolve, reject) => {
      this.instance({
        method: 'GET',
        url,
        params,
        headers: makeAuthHeader(params)
      })
        .then(res => {
          resolve(res)
          delete pendingQueue[key]
        })
        .catch(err => {
          reject(err)
          delete pendingQueue[key]
        })
    })
    pendingQueue[key] = task
    return task
  }
}()
