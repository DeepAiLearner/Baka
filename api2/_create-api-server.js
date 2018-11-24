import axios from 'axios'

const makeAuthHeader = params => {
  let headers = {}
  if (params && params.session) {
    headers.Authorization = `Bearer ${params.session}`
  }
  return headers
}

export default new class {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.baseUrl,
      headers: {
        Accept: 'application/x.api.latest+json'
      },
      timeout: 10000
    })
  }

  async get(url, data) {
    try {
      const res = await this.instance({
        method: 'GET',
        url,
        params: data,
        headers: makeAuthHeader(data)
      })
      return res.data.data
    } catch (e) {
      const code = e.response ? e.response.status || 500 : 500
      if (code === 401) {
        return null
      }
      e.code = code
      throw e
    }
  }
}()
