import path from 'path'
import { IAppConfig } from '../interfaces/config'

export const APP_LOG_DIR = process.env.APP_LOG_DIR ||
  path.join(process.cwd(), './.app/logs')

const config: IAppConfig = {
  APP_LOG_DIR }

export default config
