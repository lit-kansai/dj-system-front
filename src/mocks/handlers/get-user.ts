import { rest } from 'msw'

export const getUserHandler = rest.get('/mc/user', (_, res, ctx) => {
  ctx.status(200)
  return res(
    ctx.json(JSON.parse(`
      {
        "id": 1,
        "google_id": "999999999999999999999",
        "email": "mail@example.com",
        "name": "来福 テク子",
        "icon": "https://github.com/lit-kansai.png",
        "is_admin": true,
        "created_at": "2022-10-06T07:10:04.799Z",
        "updated_at": "2022-10-06T07:10:04.799Z",
        "linked_providers": [
          {
            "provider": "spotify",
            "is_connected": true
          }
        ]
      }
    `))
  )
})
