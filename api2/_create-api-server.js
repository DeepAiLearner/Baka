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
        e.code = e.response.status || 500
        e.message = e.response.data.message
        reject(e)
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
        const code = e.response.status || 500
        if (code === 401) {
          resolve({})
        }
        e.code = code
        e.message = e.response.data.message
        reject(e)
      }
    })
  }
}()
