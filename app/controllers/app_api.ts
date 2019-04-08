import {
  JsonController,
  Ctx,
  Post,
  Param,
  QueryParam,
  BodyParam,
  Get } from 'routing-controllers'
import AppService from '../services/app_api'
import { Inject } from 'typedi'
import {
  IGetReportItem,
  IGetReportDetailItem,
  IReportItemResponse } from '../../interfaces/reports'
import {
  IApplication,
  IApplicationSummary } from '../../interfaces/admin_manage'
import { ICategoryResponse } from '../../interfaces/category'
import { Context } from 'koa'

@JsonController('/')
export default class APIController {

  @Inject()
  service: AppService

  @Post('kill/:uuid')
  async killCurrentProcess (
    @Param('uuid') uuid: string
  ) {
    try {
      let result = this.service.killCurrentProcess(uuid)
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  @Post('application/:id')
  async runApplication (
    @Ctx() context: Context,
    @Param('id') application: string,
    @BodyParam('command') command: string,
    @BodyParam('uuid') uuid: string): Promise<IReportItemResponse> {
    let result =
      await this.service.runApplication(application, context.ip, command, uuid)
    return result
  }

  @Get('application/:id')
  async getApplicationInformation (
    @Param('id') id: string): Promise<IApplication> {
    let result = await this.service.getApplicationInformation(id)
    return result
  }

  @Get('applications')
  async getAllApplications (
    @QueryParam('limit') limit: number = 10,
    @QueryParam('page') page: number = 1,
    @QueryParam('category') category: string): Promise<{next: boolean, items: IApplicationSummary[]}> {
    let result = await this.service.getAllApplications(limit, page, category)
    return result
  }

  @Get('categories')
  async getAllCategories (
    @QueryParam('limit') limit: number = 10,
    @QueryParam('page') page: number = 1): Promise<{next: boolean, items: ICategoryResponse[]}> {
    let result = await this.service.getAllCategories(limit, page)
    return result
  }

  @Get('reports')
  async getAllReports (
    @QueryParam('limit') limit: number = 10,
    @QueryParam('page') page: number = 1,
    @QueryParam('application') id: string): Promise<{next: boolean, items: IGetReportItem[]}> {
    let result = await this.service.getAllReports(limit, page, id)
    return result
  }

  @Get('report/:id')
  async getReportInformation (
    @Param('id') id: string): Promise<IGetReportDetailItem> {
    let result = await this.service.getReportInformation(id)
    return result
  }

  @Get('report/:id/download')
  async downloadReport (
    @Ctx() ctx: Context,
    @Param('id') id: string): Promise<Buffer> {
    let result = await this.service.downloadReport(ctx, id)
    return result
  }

}
