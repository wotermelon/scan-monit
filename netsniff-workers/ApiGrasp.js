const axios = require('axios')
const Grasp = require('./Grasp')

class ApiGrasp extends Grasp {
  static name = 'api'
  constructor(checkConfig) {
    super(checkConfig)
    this.checkConfig = checkConfig
  }

  async check () {
    const { url, graspConfig = {} } = this.checkConfig
    const { api = {} } = graspConfig
    const { method = 'get', headers = {}, body = {}, params = {}, responseType = 'text', timeout = 100000 } = api
    try {
      const res = await axios({
        url,
        method,
        headers,
        data: body,
        params,
        timeout,
        responseType
      })
      const checkResult = {
        status: res.status,
        data: res.data,
        headers: res.headers
      }
      return checkResult
    } catch (error) {
      if (error.response) {
        return {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        }
      }

      if (error.request) {
        return {
          status: error.request.statusCode || -1,
          data: error.message,
          headers: {}
        }
      }
      return {
        status: -1,
        data: error.message,
        headers: {}
      }
    }
  }
}

module.exports = ApiGrasp