import { Service } from 'typedi'
import { exec } from 'child_process'
import {
  IReportItem,
  IReportItemResponse } from '../../interfaces/reports'
import { IApplication } from '../../interfaces/admin_manage'
import {
  ICategory,
  ICategoryResponse } from '../../interfaces/category'
import {
  ReportsModel,
  AdminManageModel,
  CategoryModel } from '../database/models'

@Service()
export default class AppService {

  /**
   * exec a command with Promise
   * @param {string} command
   * @private
   * @async
   * @return {Promise<string>}
   */
  private async execAsync (command: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      exec(command, (err, stdout, stderror) => {
        if (err) reject(err.message)
        else resolve(stdout)
      })
    })
  }

  /**
   * run application and get results
   * @param {string} application
   * @param {string} ip
   * @param {string} command
   * @public
   * @async
   * @return {Promise<IReportItemResponse>}
   */
  public async runApplication (
    application: string,
    ip: string,
    command: string): Promise<IReportItemResponse> {
    let findApplication =
      await AdminManageModel.findOne({ uuid: application })
    let bin = findApplication.binaryPath
    let fullCommand = `${bin} ${command}`
    let start_time: string = Date.parse(new Date().toString()).toString()
    let responseBasic = {
      start_time,
      command: fullCommand,
      client_ip: ip,
      application }
    try {
      let execResult = await this.execAsync(fullCommand)
      let response: IReportItemResponse = {
        ...responseBasic,
        end_time: Date.parse(new Date().toString()).toString(),
        succeeded: true,
        result: execResult
      }
      await ReportsModel.insertMany(<IReportItem[]>[{
        ...response, views: 0, downloads: 0 }])
      return response
    } catch (e) {
      let response: IReportItemResponse = {
        ...responseBasic,
        end_time: Date.parse(new Date().toString()).toString(),
        succeeded: false,
        result: e.toString()
      }
      await ReportsModel.insertMany(<IReportItem[]>[{
        ...response, views: 0, downloads: 0 }])
      return response
    }
  }

  /**
   * return information of the specific application
   * @param {string} uuid
   * @public
   * @async
   * @return {Promise<IApplication>}
   */
  public async getApplicationInformation (
    uuid: string): Promise<IApplication | string> {
    try {
      let result = await AdminManageModel.findOne({ uuid })
      return result
    } catch (e) {
      return e.toString()
    }
  }

  /**
   * get all application lists
   * @public
   * @async
   * @return { { next: boolean, applications: IApplication[] } | string }
   */
  public async getAllApplications (
    limit: number,
    page: number,
    category?: string): Promise<{ next: boolean, applications: IApplication[] } | string> {
    let query = category ? { category } : {}
    try {
      let resultsRaw = await AdminManageModel.find(query)
        .skip(limit * (page - 1))
        .limit(limit)
      let results = resultsRaw.map((value, index): IApplication => {
        let { binaryPath, name, avatar, version, updated, uuid } = value
        return {
          binaryPath, uuid, updated, version, avatar, name }
      })
      let nextResults = await AdminManageModel.find({})
        .skip(limit * page)
        .limit(limit)
      return {
        next: nextResults.length !== 0,
        applications: results }
    } catch (e) {
      return e.toString()
    }
  }

  /**
   * get all categories
   * @param {number} limit
   * @param {number} page
   * @public
   * @async
   * @return { Promise<{ next: boolean, categories: ICategoryResponse[] } | string>}
   */
  public async getAllCategories (
    limit: number,
    page: number): Promise<{ next: boolean, categories: ICategoryResponse[] } | string> {
    try {
      let resultsRaw = await CategoryModel.find({})
        .skip(limit * (page - 1))
        .limit(limit)
      let nextResults = await CategoryModel.find({})
        .skip(limit * page)
        .limit(limit)
      let results = resultsRaw.map((value, index) => {
        return {
          name: value.name,
          id: value._id
        }
      })
      return {
        next: nextResults.length !== 0,
        categories: results }
    } catch (e) {
      return e.toString()
    }
  }

}
