// NOTE: ワンチャンimportできそう
export type NuxtError = {
  url: string
  stateCode: string
  statusMessage: string
  message: string
  description: string
  data?: any
}
export type CurrentError = null | Error | NuxtError
