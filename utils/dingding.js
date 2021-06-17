const axios = require('axios')
const config = require('../config')

const defaultOptions = {
  msgtype: 'text',
  at: {
    isAtAll: false
  }
}

function dingding (text, title, options = {}) {
  return axios.post('https://oapi.dingtalk.com/robot/send', Object.assign({
    text: {
      content: `[监控]${title || ''}\n${Array.isArray(text) ? text.join('\n') : text}`
    }
  }, defaultOptions, options), {
      params: {
        access_token: config.dingdingNoticeToken
      }
    }
  ).catch(err => {
    console.error('dingding', err)
  })
}

module.exports = dingding