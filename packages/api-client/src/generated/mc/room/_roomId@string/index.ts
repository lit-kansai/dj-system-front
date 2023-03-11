/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    status: 200
    /** Roomの詳細情報が返される */
    resBody: Types.DetailedRoom
  }

  put: {
    status: 200
    /** 更新後のRoom情報が返される */
    resBody: Types.Room

    /** created_atとupdated_atは自動設定 */
    reqBody: {
      url_name: Types.Room_display_id
      room_name: Types.Room_name
      description: Types.Description
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
