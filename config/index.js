const path = require('path')
const fs = require('fs-extra')

const config = {
  // .har 文件存储路径
  get harFilePath () {
    const _harFilePath = path.join(__dirname, '../har-file')
    fs.ensureDirSync(_harFilePath)
    return _harFilePath
  },
  // 检查超时，毫秒
  timeout: {
    api: 10000,
    file: 10000,
    puppeteer: 20000
  },
  // 钉钉通知token
  dingdingNoticeToken: '',
  // cron：从0分钟开始,每15分钟执行一次
  cron: '0 0/1 * * * ?',
  // winston 日志配置
  winstonLog: {
    // 日志存放路径
    get logPath () {
      const _logPath = path.join(__dirname, '../logs')
      fs.ensureDirSync(_logPath)
      return _logPath
    },
    maxSize: '100m',
    maxFiles: '3d'
  }
}

module.exports = config