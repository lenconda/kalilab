import { IRedisConfig } from '../interfaces/config'

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
export const REDIS_PORT = (process.env.REDIS_PORT &&
  parseInt(process.env.REDIS_PORT)) || 6379

const config: IRedisConfig = {
  REDIS_PORT,
  REDIS_HOST
}

export default config
