import {
  JsonController,
  Get,
  Post,
  BodyParam,
  Authorized,
  Put,
  Param } from 'routing-controllers'
import AdminManageService, {
  IApplicationResponse, } from '../services/admin_manage_api'
import {
  IApplication,
  IApplicationUpdateRequest } from '../../interfaces/admin_manage'
import { Inject } from 'typedi'

@JsonController('/admin/manage')
export default class AdminManageController {

  @Inject()
  service: AdminManageService

  @Post('/application')
  @Authorized()
  async addApplication (
    @BodyParam('binaryPath') binaryPath: string,
    @BodyParam('name') name: string,
    @BodyParam('avatar') avatar: string,
    @BodyParam('version') version: string): Promise<IApplicationResponse> {
    let result = this.service.addApplication({
      binaryPath, name, version, avatar
    })
    return result
  }

  @Get('/application')
  @Authorized()
  async getAllApplications (): Promise<IApplication[] | string> {
    let results = await this.service.getAllApplications()
    return results
  }

  @Put('/application/:id')
  @Authorized()
  async modifyApplicationInformation (
    @Param('id') uuid: string,
    @BodyParam('updates') updates: IApplicationUpdateRequest ) {
    let result = await this.service.modifyApplicationInformation(updates, uuid)
    return result
  }

}
