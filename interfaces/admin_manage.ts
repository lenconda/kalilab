export interface IApplicationRequest {
  binaryPath: string
  name: string
  avatar: string
  version: string
  brief: string
}

export interface IApplication extends IApplicationRequest {
  uuid: string
  updated: string
  category: string[]
}

export interface IApplicationUpdateRequest {
  binaryPath: string
  name: string
  avatar: string
  version: string
  category: string[]
}
