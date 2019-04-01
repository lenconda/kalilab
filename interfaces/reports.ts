export interface IReportItemResponse {
  start_time: string
  end_time: string
  command: string
  succeeded: boolean
  result: string
  client_ip: string
  application: string
}

export interface IReportItem extends IReportItemResponse{
  views: number
  downloads: number
}
