const workerpool = require('workerpool')
const apiGrasp = require('./ApiGrasp')
const PuppeteerGrasp = require('./PuppeteerGrasp')
const FileGrasp = require('./FileGrasp')

const graspMap = {
  api: apiGrasp,
  puppeteer: PuppeteerGrasp,
  file: FileGrasp
}
  
async function bootstrap (checkConfig, index, count) {
  const log = (cat, text, type = 'log') => console[type](`[${index + 1}/${count}]${cat}`, checkConfig.title, text || '')
  log('启动')
  const { graspType } = checkConfig
  const grasp = graspMap[graspType]
  if (!grasp) {
    log('出错', `没有 ${graspType} 的检查类型`)
    return
  }

  const instance = new grasp(checkConfig)
  let graspResult
  let timeCost
  let beginTime = Date.now()
  return instance.check()
    .then(_graspResult => {
      timeCost = Date.now() - beginTime
      log('耗时', timeCost + 'ms')
      graspResult = _graspResult
      return instance.validate(_graspResult)
    })
    .then(result => {
      const data = {
        graspResult,
        result,
        timeCost
      }
      if (!result) {
        return instance.report(`- [${index + 1}/${count}]${checkConfig.title}_耗时${timeCost}ms_报错...\n` + JSON.stringify(graspResult), '[告警]').then(() => {
          return data
        })
      }
      return data
    })
    .catch(err => {
      log('bootstrap', err, 'error')
      return instance.report(`- [${index}/${count}]${checkConfig.title}_耗时${timeCost}ms_${err.message}`, '[出错]').then(() => {
        return {
          graspResult,
          timeCost
        }
      })
    })
}

workerpool.worker({
  bootstrap
})