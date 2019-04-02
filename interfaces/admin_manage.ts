export interface IApplicationRequest {
  binaryPath: string
  name: string
  avatar: string
  version: string
  brief: string
  category: string[]
}

export interface IApplication extends IApplicationRequest {
  updated: string
}

export interface IApplicationItem extends IApplication {
  id: string
}

export interface IApplicationUpdateRequest {
  binaryPath: string
  name: string
  avatar: string
  version: string
  category: string[]
}
