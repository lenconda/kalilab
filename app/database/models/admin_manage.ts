import mongoose from 'mongoose'
import { IApplication } from '../../../interfaces/admin_manage'

interface IApplicationMongo extends IApplication, mongoose.Document {}

const applicationSchema = new mongoose.Schema({
  uuid: String,
  binaryPath: String,
  name: String,
  avatar: String,
  version: String,
  updated: String
})

export const AdminManageModel = mongoose.model<IApplicationMongo>('ts_applications', applicationSchema)
