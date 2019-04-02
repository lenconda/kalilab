interface IApplicationBase {
  name: string
  avatar: string
  version: string
  brief: string
  category: string[]
}

export interface IApplicationRequest extends IApplicationBase {
  binaryPath: string
}

export interface IApplicationSummary {
  id: string
  updated: string
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
