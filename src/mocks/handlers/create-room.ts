import { rest } from 'msw'

export const createRoomHandler = rest.post('/mc/room', (_, res, ctx) => {
  ctx.status(200)
  return res(
    ctx.json(JSON.parse(`
      {
        "url_name": "dj_event_a_22",
        "room_name": "DJ EVENT A",
        "description": "イベントA 22年",
        "provider": "spotify",
        "playlist_id": "MGsb9KPq"
      }
    `))
  )
})
