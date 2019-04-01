import {
  JsonController,
  Ctx,
  Post,
  BodyParam } from 'routing-controllers'
import AppService from '../services/app_api'
import { Inject } from 'typedi'
import { IReportItemResponse } from '../../interfaces/reports'
import { Context } from 'koa'

@JsonController('/')
export default class APIController {

  @Inject()
  service: AppService

  @Post('application')
  async runApplication (
    @Ctx() context: Context,
    @BodyParam('application') application: string,
    @BodyParam('command') command: string): Promise<IReportItemResponse> {
    let result =
      await this.service.runApplication(application, context.ip, command)
    return result
  }

}
