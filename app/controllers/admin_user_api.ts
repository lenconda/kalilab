import {
  JsonController,
  Get,
  Post,
  Put,
  Authorized,
  CurrentUser,
  BodyParam } from 'routing-controllers'
import AdminUserService from '../services/admin_user_api'
import { Inject } from 'typedi'

@JsonController('/admin/user')
export default class AdminUserController {

  @Inject()
  service: AdminUserService

  @Post('/login')
  async login (
    @BodyParam('username') username: string,
    @BodyParam('password') password: string) {
    const result = await this.service.adminLogin(username, password)
    return result
  }

  @Get('/profile')
  @Authorized()
  async getUserProfile (@CurrentUser() userID: string) {
    const result = await this.service.getUserProfile(userID)
    return result
  }

  @Put('/update')
  @Authorized()
  async updateUserProfile (
    @CurrentUser() userID: string,
    @BodyParam('oldPassword') oldPassword: string,
    @BodyParam('username') username: string,
    @BodyParam('password') password: string) {
    const result = await this.service.updateUserProfile(userID, oldPassword, {
      username, password
    })
    return result
  }

}
