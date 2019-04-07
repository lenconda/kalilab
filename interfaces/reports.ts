interface IReportBase {
  command: string
  succeeded: boolean
  start_time: string
  end_time: string
}

export interface IReportItemResponse extends IReportBase {
  id?: string
  result: string
  client_ip: string
  application: string
}

export interface IReportMongoItem extends IReportItemResponse {
  result: string
  client_ip: string
  views: number
  downloads: number
}

export interface IGetReportItem extends IReportBase {
  id: string
  application_name: string
  application_id: string
  views: number
  downloads: number
}

export interface IGetReportDetailItem extends IReportBase {
  result: string
  application_name: string
  application_id: string
  views: number
  downloads: number
}

export interface IReportItem extends IReportMongoItem {
  id?: string
}
