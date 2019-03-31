export interface ITargetScanResultItem {
  time: string
  application: string
  command: string
  result: string
  client_ip: string
}

export interface ITargetItem {
  uuid: string
  address: string
  port: string
  protocol: string
  scans: string
}
