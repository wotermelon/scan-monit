const axios = require('axios')
const Grasp = require('./Grasp')

class FileGrasp extends Grasp {
  constructor(checkConfig) {
    super(checkConfig)
  }

  async check () {
    const { url } = this.checkConfig
    try {
      const res = await axios.head(url)
      const checkResult = {
        status: res.status,
        data: null,
        headers: res.headers
      }
      return checkResult
    } catch (error) {
      if (error.response) {
        return {
          status: error.response.status,
          data: null,
          headers: error.response.headers
        }
      }
      if (error.request) {
        return {
          status: error.request.statusCode,
          data: null,
          headers: {}
        }
      }
      return {
        status: -1,
        data: null,
        headers: {}
      }
    }
  }
}

module.exports = FileGrasp