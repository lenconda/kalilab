import {
  JsonController,
  Get,
  Post,
  Authorized,
  CurrentUser,
  BodyParam } from 'routing-controllers'
import AdminManageService from '../services/admin_manage_api'
import { Inject } from 'typedi'

@JsonController('/admin/manage')
export default class AdminManageController {

  @Inject()
  service: AdminManageService



}
