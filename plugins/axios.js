import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import generateRequestError from '~/assets/js/generateRequestError'

const isClient = typeof window !== 'undefined'

export default ({ $axios, app }) => {
  $axios.setHeader('Accept', 'application/x.api.latest+json')
  if (app.store.state.login) {
    $axios.setToken(app.store.state.user.token, 'Bearer')
  } else {
    const token = Cookies.get('JWT-TOKEN')
    if (token) {
      $axios.setToken(token, 'Bearer')
    }
  }

  $axios.onRequest(config => {
    const method = config.method.toLocaleUpperCase()
    if (isClient) {
      M.sentry.setRequestStack({
        url: config.url,
        params: method === 'GET' ? config.params : config.data,
        method
      })
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(`${method}：${config.url}`)
      }
    }
  })

  $axios.onResponse(resp => {
    if (isClient) {
      M.sentry.setResponseStack({
        url: resp.request.responseURL,
        requestId: resp.headers['x-request-id'],
        viaId: resp.headers['x-via'] || 'none',
        code: 200
      })
    }
    return resp.data.data
  })

  $axios.onError(error => {
    const err = generateRequestError(error)
    if (isClient) {
      M.sentry.setResponseStack({
        url: err.request ? err.request.responseURL || 'unknown' : 'unknown',
        code: err.statusCode,
        message: err.message
      })
    }
    Message.error(err.message)
  })
}
