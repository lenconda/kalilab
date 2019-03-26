import mongoose from 'mongoose'
import { Int32 } from 'bson'

export interface AdminUser {
  username: string
  password: string
  updateDate: string
  priority: number
}

interface IAdminUserMongo extends AdminUser, mongoose.Document {}

const adminUserSchema = new mongoose.Schema({
  username: String,
  password: String,
  updateDate: String,
  priority: Int32
})
export const AdminUserModel = mongoose.model<IAdminUserMongo>('ts_users', adminUserSchema)
