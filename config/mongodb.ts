import { IMongoConfig } from '../interfaces/config'

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = (process.env.DB_PORT
  && parseInt(process.env.DB_PORT)) || 27017
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'root'
export const DB_NAME = process.env.DB_NAME || 'kalilabs'

const config: IMongoConfig = {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
}

export default config
