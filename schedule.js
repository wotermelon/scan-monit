const schedule = require('node-schedule')
const dayjs = require('dayjs')
const main = require('./main')
const dingding = require('./utils/dingding')

const checkTime = (hour, minute) => {
  const curDate = dayjs()
  return curDate.hour() === hour && curDate.minute() === minute
}

const cron = '0 0/1 * * * ?'
console.log('[启动]', cron)

schedule.scheduleJob(cron, function () {
  main(async function before (stats) {
    // 中午12:00提示一下
    // if (checkTime(12, 0)) {
      await dingding([
        `- worker总量 ${stats.totalWorkers}`,
        `- 空闲worker ${stats.idleWorkers}`,
        `- 队列worker ${stats.pendingTasks}`,
        `- 正在运行worker ${stats.activeTasks}`
      ], dayjs().format('YYYY-DD-MM HH:mm:ss'))
    // }
  })
})