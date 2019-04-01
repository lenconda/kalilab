import { AdminUserModel } from '../database/models'
import { IAdminUser } from '../../interfaces/admin_user'
import { IMongoConfig } from '../../interfaces/config'
import MongoDBConnection from '../database/connection'
import mongoDBConfig from '../../config/mongodb'
import MD5 from 'md5'

export default async function initUser (config: IMongoConfig, username: string, password: string) {
  let mongoDBConnection = new MongoDBConnection(config)
  mongoDBConnection.connect()
  await AdminUserModel.insertMany(<IAdminUser[]>[{
    username,
    password: MD5(password),
    updateDate: Date.parse(new Date().toString()).toString() }])
  mongoDBConnection.disconnect()
}


initUser(mongoDBConfig, 'admin', 'admin')
