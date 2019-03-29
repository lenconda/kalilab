import { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import { AdminUserModel } from '../database/models/admin_user'

interface IAdminLoginResult {
  ok: boolean
  token?: string
}

interface IUpdateProfileResult {
  ok: boolean
  message: string
}

interface INewUserProfile {
  username: string
  password: string
}

interface IUserProfile {
  id: string
  username: string
  updatedAt: string
}

@Service()
export default class AdminUserService {

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
      let payload = {
        id: results._id.toString()
      }
      return { ok: true, token: jwt.sign(payload, 'turbosec', { expiresIn: '1day' }) }
    } else {
      return { ok: false, token: null }
    }
  }

  /**
   * get user profile
   * @param {string} userID
   * @public
   * @async
   * @return {Promise<IUserProfile>}
   */
  public async getUserProfile (userID: string): Promise<IUserProfile> {
    let resultRaw = await AdminUserModel.findOne({ _id: userID })
    return {
      id: resultRaw._id,
      username: resultRaw.username,
      updatedAt: resultRaw.updateDate
    }
  }

  /**
   * update user profile
   * @param {string} userID
   * @param {INewUserProfile} newProfile
   * @public
   * @async
   * @return {Promise<IUpdateProfileResult>}
   */
  public async updateUserProfile (
    userID: string,
    oldPassword: string,
    newProfile: INewUserProfile): Promise<IUpdateProfileResult> {
    let { password } = await AdminUserModel.findOne({ _id: userID })
    if (md5(oldPassword) === password) {
      try {
        let profile = {
          username: newProfile.username,
          password: md5(newProfile.password)
        }
        await AdminUserModel.updateOne({ _id: userID }, profile)
        return {
          ok: true,
          message: `Updated profile for ${userID}`
        }
      } catch (e) {
        return { ok: false, message: e.toString() }
      }
    } else {
      return {
        ok: false,
        message: 'Old password does not match'
      }
    }
  }

}
