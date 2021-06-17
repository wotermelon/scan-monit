const workerpool = require('workerpool')
const pool = workerpool.pool(__dirname + '/netsniff-workers/index.js', {
  minWorkers: 2,
  workerType: 'auto'
})
const checkConfigList = require('./config/setting')
const config = require('./config')
const createLogger = require('./utils/logger')
const dingding = require('./utils/dingding')
const dayjs = require('dayjs')

const finalLogger = createLogger('结果')
const count = checkConfigList.length

/**
 * 入口主函数
 */
async function main (before) {
  const beginTime = Date.now()
  const checkPromises = checkConfigList.map((checkConfig, index) => {
    const logger = createLogger(checkConfig.title, checkConfig.url)
    return pool
      .proxy()
      .timeout(checkConfig.timeout || config.timeout[checkConfig.graspType]) // 超时，毫秒
      .then((worker) => {
        return worker.bootstrap(checkConfig, index, checkConfigList.length)
      }).then((result) => {
        console.log(`[${index + 1}/${count}]结果`, checkConfig.title, result && result.result)
        
        logger.info('结果/' + result.result, {
          result,
          checkConfig
        })

        return {
          checkConfig,
          result: result && result.result,
          timeCost: result.timeCost
        }
      }).catch((err) => {
        console.error(err)
        // 超时 timeout
        logger.error('timeout', {
          checkConfig,
          err
        })
        return Promise.reject({
          checkConfig,
          err,
          type: 'timeout'
        })
      })
  })

  const stats = pool.stats()
  console.log('\n[开始检查]')
  console.log(`worker总量`, stats.totalWorkers)
  console.log(`空闲worker`, stats.idleWorkers)
  console.log(`队列worker`, stats.pendingTasks)
  console.log(`正在运行worker`, stats.activeTasks, '\n')

  await before(stats)
  
  try {
    // const res = await Promise.allSettled(checkPromises)
    let wrappedPromises = checkPromises.map(p => Promise.resolve(p).then(val => ({
      status: 'fulfilled',
      value: val
    }), err => ({
      tatus: 'rejected',
      reason: err
    })))
    const res = await Promise.all(wrappedPromises)

    finalLogger.info(res.map(({ status, value = {}, reason = {} }) => ({
      ...value,
      ...reason,
      status
    })))
    const timeoutlist = res.filter(item => item.status === 'rejected' && item.reason && item.reason.type === 'timeout')
    // 超时的上报
    if (timeoutlist.length) {
      await dingding(timeoutlist.map((item, index) => `- [${index + 1}/${count}]${item.reason.checkConfig.title}_超时...`
      ), '[超时]' + dayjs().format('YYYY-MM-DD HH:mm:ss'))
    } else {
      await dingding(res.map((item, index) => `- [${index + 1}/${count}]${item.value.checkConfig.title}_耗时${item.value.timeCost}ms_结果${item.value.result}`
      ).concat(`\n总耗时 ${Date.now() - beginTime}ms`), dayjs().format('YYYY-MM-DD HH:mm:ss'))
    }
  } catch (error) {
    console.error('allSettled', error)
    finalLogger.error(error)
  }
  pool.terminate()
}

module.exports = main
