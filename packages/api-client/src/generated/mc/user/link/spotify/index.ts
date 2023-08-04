/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    query: Types.Spotify_redirect_url
    status: 200

    /** Success */
    resBody: {
      redirect_url: Types.Login_url
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
