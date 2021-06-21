# 检测类型

## 自定义检查

```js
const Grasp = require('./Grasp')

class CustomGrasp extends Grasp {
  // name 为 config/setting.js 配置中的 graspType
  static name = 'custom'
  
  constructor(checkConfig) {
    // 必须
    super(checkConfig)
    // 配置
    this.checkConfig = checkConfig
  }

  /**
   * TODO:实现 check 函数，实现自定义检查函数
   * @returns {Object} result check函数返回的检查结果
   * @returns {N} result.status 请求响应http状态码
   * @returns {Object} result.data 请求响应结果内容
   * @returns {Object} result.headers 请求响应header
   */
  async check () {
    return {
      // 必须。请求响应http状态码
      status: 200,
      // 可选。请求响应结果内容
      data: '',
      // 可选。请求响应header
      headers: null
    }
  }
  /**
   * TODO: 实现 validate 函数，实现自定义校验
   * @param {Object} result check函数返回的检查结果
   * @param {Object} result.status 请求响应http状态码
   * @param {Object} result.data 请求响应结果内容
   * @param {Object} result.headers 请求响应header
   */
  async validate (result) {
    
  }
  /**
   * TODO: 实现 report 函数，实现自定义告警
   */
  async report (reportText, checkConfigTitle) {
    
  }
}

module.exports = CustomGrasp
```