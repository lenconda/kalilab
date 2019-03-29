import { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import { AdminUserModel } from '../database/models/admin_user'

@Service()
export default class AdminManageService {}
