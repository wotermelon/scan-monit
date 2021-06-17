const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const { combine, timestamp, label, prettyPrint } = winston.format
const config = require('../config')

const { winstonLog } = config

const createLogger = (category, logLabel) => {
  const logger = winston.createLogger({
    level: 'info',
    format: combine(
      label({ label: logLabel }),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      prettyPrint()
    ),
    transports: [
      new DailyRotateFile({
        filename: category + '_%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        dirname: winstonLog.logPath,
        maxSize: winstonLog.maxSize,
        maxFiles: winstonLog.maxFiles
      })
    ]
  })

  // logger.add(new winston.transports.Console())
  return logger
}

module.exports = createLogger