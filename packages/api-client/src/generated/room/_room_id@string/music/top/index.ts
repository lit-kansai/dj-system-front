/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    query?: Types.Limit | undefined
    status: 200
    /** Success */
    resBody: Types.Track[]
  }
}
