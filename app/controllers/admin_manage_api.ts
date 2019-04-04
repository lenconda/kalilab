import {
  JsonController,
  Post,
  BodyParam,
  Authorized,
  Put,
  Param,
  Delete
} from 'routing-controllers'
import AdminManageService from '../services/admin_manage_api'
import { IApplicationUpdateRequest } from '../../interfaces/admin_manage'
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
    @BodyParam('version') version: string,
    @BodyParam('brief') brief: string,
    @BodyParam('category') category: string[]): Promise<string> {
    let result = this.service.addApplication({
      binaryPath, name, version, avatar, brief, category
    })
    return result
  }

  @Put('/application/:id')
  @Authorized()
  async modifyApplicationInformation (
    @Param('id') id: string,
    @BodyParam('updates') updates: IApplicationUpdateRequest ): Promise<string> {
    let result = await this.service.modifyApplicationInformation(updates, id)
    return result
  }

  @Delete('/application/:id')
  @Authorized()
  async deleteApplication (
    @Param('id') id: string): Promise<string> {
    let result = await this.service.deleteApplication(id)
    return result
  }

  @Post('/category')
  @Authorized()
  async createCategory (
    @BodyParam('name') name: string): Promise<string> {
    let result = await this.service.createCategory(name)
    return result
  }

  @Put('/category/:id')
  @Authorized()
  async updateCategory (
    @Param('id') id: string,
    @BodyParam('name') name: string): Promise<string> {
    let result = await this.service.updateCategory(id, name)
    return result
  }

  @Delete('/category/:id')
  @Authorized()
  async deleteCategory (
    @Param('id') id: string): Promise<string> {
    let result = await this.service.deleteCategory(id)
    return result
  }

}
