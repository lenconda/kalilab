import {
  JsonController,
  Get,
  Post,
  BodyParam } from 'routing-controllers'
import AdminManageService, {
  IAddApplicationResponse } from '../services/admin_manage_api'
import { IApplication } from '../../interfaces/admin_manage'
import { Inject } from 'typedi'

@JsonController('/admin/manage')
export default class AdminManageController {

  @Inject()
  service: AdminManageService

  @Post('/application')
  async addApplication (
    @BodyParam('binaryPath') binaryPath: string,
    @BodyParam('name') name: string,
    @BodyParam('avatar') avatar: string,
    @BodyParam('version') version: string): Promise<IAddApplicationResponse> {
    let result = this.service.addApplication({
      binaryPath, name, version, avatar
    })
    return result
  }

  @Get('/application')
  async getAllApplications (): Promise<IApplication[] | string> {
    let results = await this.service.getAllApplications()
    return results
  }

}
