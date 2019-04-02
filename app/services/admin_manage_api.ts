import { Service } from 'typedi'
import {
  AdminManageModel,
  CategoryModel } from '../database/models'
import {
  IApplicationRequest,
  IApplication,
  IApplicationItem,
  IApplicationUpdateRequest } from '../../interfaces/admin_manage'
import {
  ICategory,
  ICategoryResponse } from '../../interfaces/category'

@Service()
export default class AdminManageService {

  /**
   * add an application
   * @param {IApplication} applicationInformation
   * @public
   * @async
   * @return {Promise<string>}
   */
  public async addApplication (
    applicationInformation: IApplicationRequest): Promise<string> {
    let { binaryPath, avatar, name, version, brief, category } = applicationInformation
    let updated = Date.parse(new Date().toString()).toString()
    try {
      let result = await AdminManageModel.insertMany(<IApplication[]>[{
        binaryPath, avatar, name, version, updated, brief, category}])
      return `Added application ${result[0].name}`
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * get all application lists
   * @public
   * @async
   * @return {Promise<IApplication[]>}
   */
  public async getAllApplications (): Promise<IApplicationItem[]> {
    try {
      let resultsRaw = await AdminManageModel.find({})
      let results = resultsRaw.map((value, index): IApplicationItem => {
        let { _id, binaryPath, name, avatar, version, updated, category, brief } = value
        return {
          id: _id,
          binaryPath, updated, version, avatar, name, category, brief }
      })
      return results
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * update application information
   * @param {IApplicationUpdateRequest} updatedInformation
   * @param {string} id
   * @public
   * @async
   * @return {Promise<string>}
   */
  public async modifyApplicationInformation (
    updatedInformation: IApplicationUpdateRequest,
    id: string): Promise<string> {
    try {
      await AdminManageModel.findByIdAndUpdate(id, {
        ...updatedInformation,
        updated: Date.parse(new Date().toString()).toString()
      })
      return `Updated application ${id}`
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * delete an application
   * @param {string} id
   * @public
   * @async
   * @return {Promise<string>}
   */
  public async deleteApplication (id: string): Promise<string> {
    try {
      await AdminManageModel.findByIdAndDelete(id)
      return `Deleted application ${id}`
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * get all categories
   * @public
   * @async
   * @return { Promise<ICategory[]> }
   */
  public async getAllCategories (): Promise<ICategory[]> {
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
      throw new Error(e)
    }
  }

  /**
   * create a category
   * @param {string} name
   * @public
   * @async
   * @return {Promise<string>}
   */
  public async createCategory (
    name: string): Promise<string> {
    try {
      await CategoryModel.insertMany(<ICategoryResponse[]>[{
        name
      }])
      return `Added a new category '${name}'`
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * update category name
   * @param {string} id
   * @param {string} name
   * @public
   * @async
   * @return {Promise<string>}
   */
  public async updateCategory (
    id: string,
    name: string): Promise<string> {
    try {
      await CategoryModel.findByIdAndUpdate(id, { name })
      return `Updated category ${name}(${id})`
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * delete a category
   * @param {string} id
   * @public
   * @async
   * @return {Promise<string>}
   */
  public async deleteCategory (
    id: string): Promise<string> {
    try {
      await CategoryModel.findByIdAndDelete(id)
      return `Deleted category ${id}`
    } catch (e) {
      throw new Error(e)
    }
  }

}
