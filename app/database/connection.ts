import mongoose, { Mongoose } from 'mongoose'
import { IMongoConfig } from '../../interfaces/config'
import getLogger from '../utils/logger'

const logger = getLogger(__filename)

export default class MongoDBConnection {

  /**
   * @constructor
   * @param {IMongoDBConfig} connectionParams
   */
  constructor (connectionParams: IMongoConfig) {
    let {
      DB_HOST,
      DB_PORT,
      DB_USER,
      DB_PASSWORD,
      DB_NAME } = connectionParams
    let authorization = (DB_USER && DB_PASSWORD) ?
      `${DB_USER}:${DB_PASSWORD}@` : ''
    this.uri = `mongodb://${authorization}${DB_HOST}:${DB_PORT}/${DB_NAME}`
    this.database
  }

  private uri: string
  private database: Promise<Mongoose | void>

  /**
   * connect to MongoDB server
   * @public
   */
  public connect () {
    this.database = mongoose
      .connect(this.uri, {
        useNewUrlParser: true, useCreateIndex: true })
      .catch((err: Error) => logger.error(err.message))
  }

  /**
   * disconnect from MongoDB server
   * @public
   */
  public disconnect () {
    mongoose.disconnect()
  }

}
