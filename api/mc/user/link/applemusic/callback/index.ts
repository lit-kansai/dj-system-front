/* eslint-disable */
import type * as Types from '../../../../../@types'

export type Methods = {
  post: {
    status: 200

    /** 要求に成功した */
    resBody: {
      /** 成功したか */
      ok: boolean
    }

    reqBody: {
      music_user_token: Types.Music_user_token
      access_token: Types.Access_token
    }
  }
}
