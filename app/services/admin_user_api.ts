import { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import {
  BadRequestError,
  ForbiddenError } from 'routing-controllers'
import { AdminUserModel } from '../database/models'

export interface IAdminLoginResult {
  ok: boolean
  token?: string
}

export interface IUpdateProfileResult {
  ok: boolean
  message: string
}

interface INewUserProfile {
  username: string
  password: string
}

export interface IUserProfile {
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
  public async adminLogin (username: string, password: string): Promise<string> {
    let results = await AdminUserModel.findOne({ username, password: md5(password) })
    if (results) {
      let payload = {
        id: results._id.toString()
      }
      return jwt.sign(payload, 'kalilabs', { expiresIn: '1day' })
    } else {
      throw new ForbiddenError('Login failed')
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
    newProfile: INewUserProfile): Promise<{message: string}> {
    let { password } = await AdminUserModel.findOne({ _id: userID })
    if (md5(oldPassword) === password) {
      try {
        let profile = {
          username: newProfile.username,
          password: md5(newProfile.password)
        }
        await AdminUserModel.updateOne({ _id: userID }, profile)
        return {
          message: `Updated profile for ${userID}`
        }
      } catch (e) {
        return e.toString()
      }
    } else {
      throw new BadRequestError('Old password does not match')
    }
  }

}
