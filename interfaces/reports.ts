export interface IReportItem {
  start_time: string
  end_time: string
  command: string
  succeeded: boolean
  result: string
  client_ip: string
  application: string
  views: number
  downloads: number
}
