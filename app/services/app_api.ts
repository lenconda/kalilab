import { Service } from 'typedi'
import { exec } from 'child_process'
import {
  IReportItem,
  IReportItemResponse } from '../../interfaces/reports'
import { ReportsModel } from '../database/models'

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
    let start_time: string = Date.parse(new Date().toString()).toString()
    try {
      let execResult = await this.execAsync(command)
      let result: IReportItemResponse = {
        start_time,
        end_time: Date.parse(new Date().toString()).toString(),
        command,
        succeeded: true,
        result: execResult,
        client_ip: ip,
        application
      }
      await ReportsModel.insertMany(<IReportItem[]>[{
        ...result, views: 0, downloads: 0 }])
      return result
    } catch (e) {
      let result: IReportItemResponse = {
        start_time,
        end_time: Date.parse(new Date().toString()).toString(),
        command,
        succeeded: false,
        result: e.toString(),
        client_ip: ip,
        application
      }
      await ReportsModel.insertMany(<IReportItem[]>[{
        ...result, views: 0, downloads: 0 }])
      return result
    }
  }

}
