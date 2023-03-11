/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200

    /** Roomの情報が返される */
    resBody: {
      id: Types.Room_display_id
      name: Types.Room_name
      description: Types.Description
    }
  }
}
