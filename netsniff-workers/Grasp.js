const mime = require('mime')
const getHeader = require('../utils/get-header')
const dingding = require('../utils/dingding')

class Grabsp {
  constructor(checkConfig) {
    this.checkConfig = checkConfig
  }
  /**
   * @implement 检查
   */
  check () {

  }
  /**
   * 校验
   */
  validate (graspResult) {
    const { validateType = '' } = this.checkConfig
    this.validateMap = {
      status: this.validateStatus,
      text: this.validateText,
      file: this.validateFile
    }
    const handler = this.validateMap[validateType]
    if (!handler) {
      console.warn(`[validate]-没有 ${validateType} 相对应的校验函数`)
      return
    }
    return handler.call(this, graspResult)
  }
  /**
   * 校验状态码
   */
  validateStatus ({ status: statusResult }) {
    const { validateConfig = {} } = this.checkConfig
    const { status = [] } = validateConfig
    const isValid = status.some(statusCode => statusCode === statusResult)
    return isValid
  }
  /**
   * 校验包含文本
   */
  validateText ({ data }) {
    if (!data) return false

    const { validateConfig = {} } = this.checkConfig
    const { text = '' } = validateConfig
    const isValid = data.indexOf(text) !== -1
    return isValid
  }
  /**
   * 校验文件的mime type
   */
  validateFile ({ headers: headersResult }) {
    if (!headersResult) return false
    
    const { validateConfig = {} } = this.checkConfig
    const { fileExtension = '' } = validateConfig
    const contentType = getHeader(headersResult, 'content-type')
    const mimeType = contentType.split(';')[0]

    const isValid = mime.getExtension(mimeType) === fileExtension
    return isValid
  }
  // /**
  //  * 保存检查结果
  //  */
  // saveResult (result) {
    
  // }
  /**
   * 告警通知
   */
  report (text, title) {
    return dingding(text, title, {
      at: {
        isAtAll: !!this.checkConfig.isAtAll
      }
    })
  }
}

module.exports = Grabsp