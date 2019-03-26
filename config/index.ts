import { IConfig } from '../interfaces/config'
import path from 'path'

import APP from './app'
import MONGODB from './mongodb'

const relativeFilePath = (filePath: string): string =>
  path.relative(process.cwd(), filePath)

const config: IConfig = {
  ...APP,
  ...MONGODB,
  relativeFilePath
}

export default config
