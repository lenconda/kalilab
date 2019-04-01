import mongoose from 'mongoose'
import {
  IReportItem } from '../../../interfaces/reports'
import { Int32 } from 'bson'

interface IReportsMongo extends IReportItem, mongoose.Document {}

const reportsSchema = new mongoose.Schema<IReportItem>({
  date: String,
  command: String,
  client_ip: String,
  application: String,
  views: Int32,
  downloads: Int32
})

export const ReportsModel = mongoose.model<IReportsMongo>('ts_reports', reportsSchema)
