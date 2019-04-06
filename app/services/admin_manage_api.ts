import { Service } from 'typedi'
import {
  AdminManageModel,
  CategoryModel } from '../database/models'
import {
  IApplicationRequest,
  IApplication,
  IApplicationUpdateRequest } from '../../interfaces/admin_manage'
import {
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
    applicationInformation: IApplicationRequest): Promise<{message: string}> {
    let { binaryPath, avatar, name, version, brief, category } = applicationInformation
    let updated = Date.parse(new Date().toString()).toString()
    try {
      let result = await AdminManageModel.insertMany(<IApplication[]>[{
        binaryPath, avatar, name, version, updated, brief, category}])
      return {
        message: `Added application ${result[0].name}`
      }
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
    id: string): Promise<{message: string}> {
    try {
      await AdminManageModel.findByIdAndUpdate(id, {
        ...updatedInformation,
        updated: Date.parse(new Date().toString()).toString()
      })
      return {
        message: `Updated application ${id}`
      }
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
  public async deleteApplication (id: string): Promise<{message: string}> {
    try {
      await AdminManageModel.findByIdAndDelete(id)
      return {
        message: `Deleted application ${id}`
      }
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
    name: string): Promise<{message: string}> {
    try {
      await CategoryModel.insertMany(<ICategoryResponse[]>[{
        name
      }])
      return {
        message: `Added a new category '${name}'`
      }
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
    name: string): Promise<{message: string}> {
    try {
      await CategoryModel.findByIdAndUpdate(id, { name })
      return {
        message: `Updated category ${name}(${id})`
      }
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
