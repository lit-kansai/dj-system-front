import { rest } from 'msw'
import { GetRoomResponse } from '../api'

export const mockRoomOverviewResponse: GetRoomResponse = {
  id: 'sample-room',
  name: 'サンプルのルーム',
  description: 'モックのルームです。'
}

export const roomOverviewResponseHandler = rest.get(
  '/room/:roomId',
  (_, res, ctx) => {
    // 正常系
    // return res(ctx.json(mockRoomOverviewResponse))

    // エラー
    return res(
      ctx.status(404),
      ctx.json({ status: 'Room not Found' })
    )
  }
)
