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

    reqBody: {
      musics: Types.Provided_music_id[]
      radio_name?: Types.Radio_name | undefined
      message?: Types.Message | undefined
    }
  }
}
