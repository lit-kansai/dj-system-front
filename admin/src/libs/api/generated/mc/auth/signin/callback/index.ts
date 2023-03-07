/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  post: {
    status: 200

    /** Success */
    resBody: {
      api_token: Types.Api_token
      user_id: Types.User_id
    }

    reqBody: {
      redirect_url: Types.Redirect_url
      code: Types.Code
    }
  }
}
