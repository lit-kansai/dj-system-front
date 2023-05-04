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
      id: Types.Room_unique_id
      owner_user_id: Types.Owner_user_id
      display_id: Types.Room_display_id
      name: Types.Room_name
      description: Types.Description
      playlist_id: Types.Provider_playlist_id
      provider: Types.Provider
      room_cooltime: Types.Room_cooltime
      created_at: Types.Created_at
      updated_at: Types.Updated_at
    }

    reqBody: {
      url_name: Types.Room_display_id
      room_name: Types.Room_name
      description: Types.Description
      provider: Types.Provider
      playlist_id?: Types.Provider_playlist_id | undefined
    }
  }
}
