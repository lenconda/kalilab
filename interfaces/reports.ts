export interface IReportItemResponse {
  start_time: string
  end_time: string
  command: string
  uuid: string
  succeeded: boolean
  result: string
  client_ip: string
  application: string
}

export interface IReportMongoItem extends IReportItemResponse {
  views: number
  downloads: number
}

export interface IReportItem extends IReportMongoItem {}
