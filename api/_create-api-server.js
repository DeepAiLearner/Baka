import axios from 'axios'
import parseToken from '~/assets/js/parseToken'

class Http {
  constructor(ctx) {
    console.log(process.env.baseUrl)
    this.instance = axios.create({
      baseURL: process.env.baseUrl,
      headers: {
        Accept: 'application/x.api.latest+json',
        Authorization: `Bearer ${parseToken(ctx)}`
      },
      timeout: 10000
    })
  }

  async get(url, data) {
    try {
      const res = await this.instance.get(url, {
        params: data && data.params ? data.params : {}
      })
      return res.data.data
    } catch (e) {
      const code = e.response ? e.response.status : 500
      if (code === 401) {
        return null
      }
      e.code = code
      throw e
    }
  }

  async post(url, data) {
    try {
      const res = await this.instance.post(url, data)
      return res.data.data
    } catch (e) {
      const code = e.response ? e.response.status : 500
      if (code === 401) {
        return null
      }
      e.code = code
      throw e
    }
  }
}

export default ctx => {
  return new Http(ctx)
}
