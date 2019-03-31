import mongoose from 'mongoose'
import {
  ITargetItem } from '../../../interfaces/targets'

interface ITargetsMongo extends ITargetItem, mongoose.Document {}

const targetSchema = new mongoose.Schema<ITargetItem>({
  uuid: { type: String, index: true, unique: true },
  address: String,
  port: String,
  protocol: String,
  scans: String
})

export const TargetModel = mongoose.model<ITargetsMongo>('ts_targets', targetSchema)
