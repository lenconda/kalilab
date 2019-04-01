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
import { IReportItemResponse } from '../../interfaces/reports'
import { IApplication } from '../../interfaces/admin_manage'
import { ICategoryResponse } from '../../interfaces/category'
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

  @Get('applications')
  async getAllApplications (
    @QueryParam('limit') limit: number,
    @QueryParam('page') page: number,
    @QueryParam('category') category: string): Promise<{ next: boolean, applications: IApplication[] } | string> {
    let result = await this.service.getAllApplications(limit, page, category)
    return result
  }

  @Get('categories')
  async getAllCategories (
    @QueryParam('limit') limit: number,
    @QueryParam('page') page: number): Promise<{ next: boolean, categories: ICategoryResponse[] } | string> {
    let result = await this.service.getAllCategories(limit, page)
    return result
  }

}
