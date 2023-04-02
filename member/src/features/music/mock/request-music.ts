import { rest } from 'msw'
import { RequestMusicResponse } from '../api'
export const mockRequestMusicResponse: RequestMusicResponse = {
  ok: true
}

export const requestMusicHandler = rest.post(
  '/room/:roomId/request',
  (_, res, ctx) => res(ctx.json(mockRequestMusicResponse))
)
