import { IConfig } from '../interfaces/config'
import path from 'path'

import APP from './app'
import MONGODB from './mongodb'
import REDIS from './redis'

const relativeFilePath = (filePath: string): string =>
  path.relative(process.cwd(), filePath)

const config: IConfig = {
  ...APP,
  ...MONGODB,
  ...REDIS,
  relativeFilePath
}

export default config
