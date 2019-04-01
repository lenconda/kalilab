import {
  JsonController,
  Ctx,
  Post,
  Param,
  BodyParam,
  Get } from 'routing-controllers'
import AppService from '../services/app_api'
import { Inject } from 'typedi'
import { IReportItemResponse } from '../../interfaces/reports'
import { IApplication } from '../../interfaces/admin_manage'
import { Context } from 'koa'

@JsonController('/')
export default class APIController {

  @Inject()
  service: AppService

  @Post('application/:id')
  async runApplication (
    @Ctx() context: Context,
    @Param('id') application: string,
    @BodyParam('command') command: string): Promise<IReportItemResponse> {
    let result =
      await this.service.runApplication(application, context.ip, command)
    return result
  }

  @Get('application/:id')
  async getApplicationInformation (
    @Param('id') uuid: string): Promise<IApplication | string> {
    let result = await this.service.getApplicationInformation(uuid)
    return result
  }

}
