/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  post: {
    status: 200

    /** 要求に成功した */
    resBody: {
      /** 成功したか */
      ok: boolean
    }

    reqBody: Types.Spotify_request | Types.Applemusic_request
  }
}
