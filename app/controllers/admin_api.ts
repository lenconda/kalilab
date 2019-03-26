import { JsonController, Get, Post, QueryParam, BodyParam } from 'routing-controllers'
import AdminAPIService from '../services/admin_api'
import { Inject } from 'typedi'

@JsonController('/admin')
export default class APIController {

  @Inject()
  service: AdminAPIService

  @Post('login')
  async info (@BodyParam('optr1') optr1: number, @BodyParam('optr2') optr2: number) {
    const result = await this.service.getArithmeticResult(optr1, optr2)
    return result
  }

}
