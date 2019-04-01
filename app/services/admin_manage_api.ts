import { Service } from 'typedi'
import uuidv3 from 'uuid/v3'
import {
  AdminManageModel,
  CategoryModel } from '../database/models'
import {
  IApplicationRequest,
  IApplication,
  IApplicationUpdateRequest } from '../../interfaces/admin_manage'
import {
  ICategory,
  ICategoryResponse } from '../../interfaces/category'
import config from '../../config'
const { UUID_NAMESPACE } = config

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
    let uuid = uuidv3(`${binaryPath}:${version}`, UUID_NAMESPACE)
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

  /**
   * get all categories
   * @public
   * @async
   * @return { Promise<ICategory[] | string> }
   */
  public async getAllCategories (): Promise<ICategory[] | string> {
    try {
      let resultRaw = await CategoryModel.find({})
      let result = resultRaw.map((value, index) => {
        return {
          id: value._id,
          name: value.name
        }
      })
      return result
    } catch (e) {
      return e.toString()
    }
  }

  /**
   * create a category
   * @param {string} name
   * @public
   * @async
   * @return {Promise<IApplicationResponse | string>}
   */
  public async createCategory (
    name: string): Promise<IApplicationResponse | string> {
    try {
      await CategoryModel.insertMany(<ICategoryResponse[]>[{
        name
      }])
      return {
        ok: true,
        message: `Added a new category '${name}'`
      }
    } catch (e) {
      return {
        ok: false,
        message: e.toString()
      }
    }
  }

  /**
   * update category name
   * @param {string} id
   * @param {string} name
   * @public
   * @async
   * @return {Promise<IApplicationResponse | string>}
   */
  public async updateCategory (
    id: string,
    name: string): Promise<IApplicationResponse | string> {
    try {
      await CategoryModel.findByIdAndUpdate(id, { name })
      return {
        ok: true,
        message: `Updated category ${name}(${id})`
      }
    } catch (e) {
      return e.toString()
    }
  }

}
