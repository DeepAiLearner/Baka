import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import generateRequestError from '~/assets/js/generateRequestError'

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
    if (process.env.NODE_ENV === 'development') {
      console.log(`${config.method.toLocaleUpperCase()}：${config.url}`)
    }
  })

  $axios.onResponse(resp => {
    return resp.data.data
  })

  $axios.onError(error => {
    const err = generateRequestError(error)
    Message.error(err.message)
  })
}
