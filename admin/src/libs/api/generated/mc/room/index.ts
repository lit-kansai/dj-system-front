/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200
    /** Success */
    resBody: Types.Room[]
  }

  post: {
    status: 200

    /** 作成されたRoom情報が返される */
    resBody: {
      url_name: Types.Room_display_id
      room_name: Types.Room_name
      description: Types.Description
      provider: Types.Provider
    }

    reqBody: {
      url_name: Types.Room_display_id
      room_name: Types.Room_name
      description: Types.Description
      provider: Types.Provider
      playlist_id?: Types.Playlist_id | undefined
    }
  }
}
