import path from 'path'
import { IAppConfig } from '../interfaces/config'

export const APP_LOG_DIR = process.env.APP_LOG_DIR ||
  path.join(process.cwd(), './.app/logs')

export const UUID_NAMESPACE = 'b4e19c21-f97f-489f-9aa7-37e108a50c6f'

const config: IAppConfig = {
  APP_LOG_DIR,
  UUID_NAMESPACE }

export default config
