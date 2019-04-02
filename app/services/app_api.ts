import { Service } from 'typedi'
import { exec } from 'child_process'
import {
  IReportItem,
  IReportItemResponse } from '../../interfaces/reports'
import { IApplication } from '../../interfaces/admin_manage'
import { ICategoryResponse } from '../../interfaces/category'
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
   * find results by page
   * @param {any} model
   * @param {any} condition
   * @param {number} limit
   * @param {number} page
   * @private
   * @async
   * @return {Promise<{ item: any[], next: boolean }>}
   */
  private async pagination (
    model: any,
    condition: any,
    limit: number,
    page: number): Promise<{ items: any[], next: boolean }> {
    let results = await model.find(condition)
      .skip(limit * (page - 1))
      .limit(limit)
    let nextResults = await model.find(condition)
      .skip(limit * page)
      .limit(limit)
    return {
      items: results,
      next: nextResults.length !== 0
    }
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
    category?: string): Promise<{ next: boolean, items: IApplication[] } | string> {
    let query = category ? { category } : {}
    try {
      let result = await this.pagination(AdminManageModel, query, limit, page)
      return result
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
    page: number): Promise<{ next: boolean, items: ICategoryResponse[] } | string> {
    try {
      let result = await this.pagination(CategoryModel, {}, limit, page)
      return {
        next: result.next,
        items: result.items.map((value, index) => {
          return {
            id: value._id,
            name: value.name
          }
        })
      }
    } catch (e) {
      return e.toString()
    }
  }

}
