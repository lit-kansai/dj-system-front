import { AxiosResponse } from 'axios'
import { snakeToCamel } from '@dj-system/utils'

export const responseHandler = (response: AxiosResponse): AxiosResponse => {
  response.data = snakeToCamel(response.data)
  return response
}
