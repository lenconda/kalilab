import mongoose from 'mongoose'
import { IApplication } from '../../interfaces/admin_manage'
import { IAdminUser } from '../../interfaces/admin_user'
import { IReportItem } from '../../interfaces/reports'
import { ICategoryResponse } from '../../interfaces/category'

// admin application schema
interface IApplicationMongo extends IApplication, mongoose.Document {}

const applicationSchema = new mongoose.Schema({
  uuid: { type: String, index: true, unique: true },
  binaryPath: String,
  brief: String,
  category: [String],
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
  result: String,
  client_ip: String,
  application: String,
  views: Number,
  downloads: Number
})

// category interface
interface ICategoryMongo extends ICategoryResponse, mongoose.Document {}

const categorySchema = new mongoose.Schema<ICategoryResponse>({
  name: String
})

export const AdminManageModel = mongoose.model<IApplicationMongo>('kl_applications', applicationSchema)
export const AdminUserModel = mongoose.model<IAdminUserMongo>('kl_users', adminUserSchema)
export const ReportsModel = mongoose.model<IReportsMongo>('kl_reports', reportsSchema)
export const CategoryModel = mongoose.model<ICategoryMongo>('kl_categories', categorySchema)
