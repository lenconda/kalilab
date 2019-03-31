import { Service } from 'typedi'
import uuidv3 from 'uuid/v3'
import { AdminManageModel } from '../database/models/admin_manage'
import {
  IApplicationRequest,
  IApplication,
  IApplicationUpdateRequest } from '../../interfaces/admin_manage'

const NAMESPACE = 'b4e19c21-f97f-489f-9aa7-37e108a50c6f'

export interface IApplicationResponse {
  ok: boolean
  message: string
}

@Service()
export default class AdminManageService {

  /**
   * add an application
   * @param {IApplication} applicationInformation
   * @public
   * @async
   * @return {IApplicationResponse}
   */
  public async addApplication (
    applicationInformation: IApplicationRequest): Promise<IApplicationResponse> {
    let { binaryPath, avatar, name, version } = applicationInformation
    let uuid = uuidv3(`${binaryPath}:${version}`, NAMESPACE)
    let updated = Date.parse(new Date().toString()).toString()
    try {
      let result = await AdminManageModel.insertMany(<IApplication[]>[{
        binaryPath, avatar, name, version,
        uuid, updated
      }])
      return {
        ok: true,
        message: `Added application ${result[0].name}`
      }
    } catch (e) {
      return {
        ok: false,
        message: e.toString()
      }
    }
  }

  /**
   * get all application lists
   * @public
   * @async
   * @return {Promise<IApplication[] | string>}
   */
  public async getAllApplications (): Promise<IApplication[] | string> {
    try {
      let resultsRaw = await AdminManageModel.find({})
      let results = resultsRaw.map((value, index): IApplication => {
        let { binaryPath, name, avatar, version, updated, uuid } = value
        return {
          binaryPath, uuid, updated, version, avatar, name }
      })
      return results
    } catch (e) {
      return e.toString()
    }
  }

  /**
   * update application information
   * @param {IApplicationUpdateRequest} updatedInformation
   * @param {string} uuid
   * @public
   * @async
   * @return {IApplicationResponse}
   */
  public async modifyApplicationInformation (
    updatedInformation: IApplicationUpdateRequest,
    uuid: string): Promise<IApplicationResponse> {
    try {
      await AdminManageModel.updateOne({ uuid }, {
        ...updatedInformation,
        updated: Date.parse(new Date().toString()).toString()
      })
      return {
        ok: true,
        message: `Updated application ${uuid}`
      }
    } catch (e) {
      return {
        ok: false,
        message: e.toString()
      }
    }
  }

  /**
   * delete an application
   * @param {string} uuid
   * @public
   * @async
   * @return {IApplicationResponse}
   */
  public async deleteApplication (uuid: string): Promise<IApplicationResponse> {
    try {
      await AdminManageModel.deleteOne({ uuid })
      return {
        ok: true,
        message: `Deleted application ${uuid}`
      }
    } catch (e) {
      return {
        ok: false,
        message: e.toString()
      }
    }
  }

}
