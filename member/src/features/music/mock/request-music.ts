import { rest } from 'msw'
import { RequestMusicResponse } from '../api'
export const mockRequestMusicResponse: RequestMusicResponse = {
  ok: true
}

export const requestMusicHandler = rest.post(
  '/room/:roomId/request',
  (_, res, ctx) => {
    // 正常系
    // res(ctx.json(mockRequestMusicResponse))

    // タイムアウト
    return res(
      ctx.status(408),
      ctx.delay(4000),
      ctx.json({ status: 'timeout' })
    )
  }
)
