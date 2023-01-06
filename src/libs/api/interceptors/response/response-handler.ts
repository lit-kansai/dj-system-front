import { AxiosResponse } from 'axios'
import { snakeToCamel } from '@/utils'

export const responseHandler = (response: AxiosResponse): AxiosResponse => {
  response.data = snakeToCamel(response.data)
  return response
}
