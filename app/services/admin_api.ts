import { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import { AdminUserModel } from '../database/models/admin_user'

interface IAdminLoginResult {
  ok: boolean
  token?: string
}

@Service()
export default class AdminAPIService {

  /**
   * get user token
   * @param {string} username
   * @param {string} password
   * @public
   * @async
   * @return {Promise<IAdminLoginResult>}
   */
  public async adminLogin (username: string, password: string): Promise<IAdminLoginResult> {
    let results = await AdminUserModel.findOne({ username, password: md5(password) })
    if (results) {
      console.log(results._id)
      let payload = {
        id: results._id.toString()
      }
      return { ok: true, token: jwt.sign(payload, 'turbosec', { expiresIn: '1day' }) }
    } else {
      return { ok: false, token: null }
    }
  }

}
