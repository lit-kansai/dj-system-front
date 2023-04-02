import { rest } from 'msw'
import { GetRoomResponse } from '../api'

export const mockRoomOverviewResponse: GetRoomResponse = {
  id: 'sample-room',
  name: 'サンプルのルーム',
  description: 'モックのルームです。'
}

export const roomOverviewResponseHandler = rest.get(
  '/room/:roomId',
  (_, res, ctx) => res(ctx.json(mockRoomOverviewResponse))
)
