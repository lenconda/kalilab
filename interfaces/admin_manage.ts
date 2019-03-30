export interface IApplicationRequest {
  binaryPath: string
  name: string
  avatar: string
  version: string
}

export interface IApplication extends IApplicationRequest {
  uuid: string
  updated: string
}
