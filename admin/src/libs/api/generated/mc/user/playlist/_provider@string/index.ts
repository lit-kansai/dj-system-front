/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    status: 200
    /** Success */
    resBody: Types.Playlist[]
  }

  post: {
    status: 200

    /** 要求に成功した */
    resBody: {
      /** 成功したか */
      ok: boolean
      /** 作成した要素のID */
      id: string
    }

    reqBody: {
      name: Types.Playlist_name
      description: Types.Playlist_description
    }
  }
}
