import { JsonController, Get, Post, QueryParam, BodyParam } from 'routing-controllers'
import AdminAPIService from '../services/admin_api'
import { Inject } from 'typedi'

@JsonController('/admin')
export default class APIController {

  @Inject()
  service: AdminAPIService

  @Post('/login')
  async login (@BodyParam('username') username: string, @BodyParam('password') password: string) {
    const result = await this.service.adminLogin(username, password)
    return result
  }

}
