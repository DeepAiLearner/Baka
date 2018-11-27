import axios from 'axios'
import generateRequestError from './_generateRequestError'

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
        accept: 'application/x.api.latest+json'
      },
      timeout: 10000
    })
  }

  get(url, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.instance({
          method: 'GET',
          url,
          params: data,
          headers: makeAuthHeader(data)
        })
        resolve(res.data.data)
      } catch (e) {
        reject(generateRequestError(e))
      }
    })
  }

  post(url, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.instance({
          method: 'POST',
          url,
          data,
          headers: makeAuthHeader(data)
        })
        resolve(res.data.data)
      } catch (e) {
        const resp = e.response || {}
        const code = resp.status || 0
        if (code === 401) {
          resolve({})
        }
        reject(generateRequestError(e))
      }
    })
  }
}()
