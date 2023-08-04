/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    status: 200

    /** Success */
    resBody: {
      access_token: Types.Access_token
    }
  }

  delete: {
    status: 200

    /** 要求に成功した */
    resBody: {
      /** 成功したか */
      ok: boolean
    }
  }
}
