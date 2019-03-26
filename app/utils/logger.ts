import loggers from 'log4js'
import config from '../../config'

const {
  APP_LOG_DIR,
  relativeFilePath } = config

export default function getLogger (filePath: string) {

  loggers.configure({
    appenders: {
      ruleConsole: {
        type: 'console'
      },
      ruleFile: {
        type: 'dateFile',
        filename: `${APP_LOG_DIR}/log-`,
        pattern: 'yyyy-MM-dd.log',
        maxLogSize: 1000 * 1024 * 1024,
        numBackups: 3,
        alwaysIncludePattern: true
      }
    },
    categories: {
      default: {
        appenders: ['ruleConsole', 'ruleFile'],
        level: 'info'
      }
    }
  })

  return loggers.getLogger(relativeFilePath(filePath))

}
