import mongoose from 'mongoose'

export interface AdminUser {
  username: string
  password: string
  updateDate: string
}

interface IAdminUserMongo extends AdminUser, mongoose.Document {}

const adminUserSchema = new mongoose.Schema({
  username: String,
  password: String,
  updateDate: String
})
export const AdminUserModel = mongoose.model<IAdminUserMongo>('ts_users', adminUserSchema)
