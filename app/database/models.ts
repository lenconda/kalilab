import mongoose from 'mongoose'
import { IApplication } from '../../interfaces/admin_manage'
import { IAdminUser } from '../../interfaces/admin_user'
import { IReportItem } from '../../interfaces/reports'
import { Int32 } from 'bson'

// admin application schema
interface IApplicationMongo extends IApplication, mongoose.Document {}

const applicationSchema = new mongoose.Schema({
  uuid: { type: String, index: true, unique: true },
  binaryPath: String,
  name: String,
  avatar: String,
  version: String,
  updated: String
})

// admin user schema
interface IAdminUserMongo extends IAdminUser, mongoose.Document {}

const adminUserSchema = new mongoose.Schema({
  username: { type: String, unique: true, index: true },
  password: String,
  updateDate: String
})

// reports schema
interface IReportsMongo extends IReportItem, mongoose.Document {}

const reportsSchema = new mongoose.Schema<IReportItem>({
  start_time: String,
  end_time: String,
  command: String,
  succeeded: Boolean,
  client_ip: String,
  application: String,
  views: Int32,
  downloads: Int32
})

export const AdminManageModel = mongoose.model<IApplicationMongo>('ts_applications', applicationSchema)
export const AdminUserModel = mongoose.model<IAdminUserMongo>('ts_users', adminUserSchema)
export const ReportsModel = mongoose.model<IReportsMongo>('ts_reports', reportsSchema)
