import { AdminUserModel, AdminUser } from '../database/models/admin_user'
import { IMongoConfig } from '../../interfaces/config'
import MongoDBConnection from '../database/connection'
import mongoDBConfig from '../../config/mongodb'
import MD5 from 'md5'

export default async function initUser (config: IMongoConfig, username: string, password: string) {
  let mongoDBConnection = new MongoDBConnection(config)
  mongoDBConnection.connect()
  let results = await AdminUserModel.insertMany(<AdminUser[]>[{
    username,
    password: MD5(password),
    updateDate: Date.parse(new Date().toString()).toString() }])
  mongoDBConnection.disconnect()
}


initUser(mongoDBConfig, 'admin', 'admin')
