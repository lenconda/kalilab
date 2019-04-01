export interface IReportItem {
  date: string
  command: string
  succeeded: boolean
  client_ip: string
  application: string
  views: number
  downloads: number
}
