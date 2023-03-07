import { rest } from 'msw'

export const getRoomHandler = rest.get('/mc/room/:roomId', (_, res, ctx) => {
  ctx.status(200)
  return res(
    ctx.json(JSON.parse(`
      {
        "id": 0,
        "owner_user_id": 1,
        "display_id": "dj_event_a_22",
        "name": "DJ EVENT A",
        "description": "イベントA 22年",
        "playlist_id": "MGsb9KPq",
        "provider": "spotify",
        "created_at": "2022-10-06T07:10:04.799Z",
        "updated_at": "2022-10-06T07:10:04.799Z",
        "users": [
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
        ],
        "musics": [
          {
            "id": 1,
            "provided_music_id": "spotify:track:67T4aWFCAbMNWKamvI3piH",
            "letter_id": "string",
            "artists": "BUMP OF CHICKEN, 初音ミク",
            "album": "ray",
            "name": "ray",
            "thumbnail": "https://i.scdn.co/image/ab67616d0000b2731bc3a96706495fb0a1dbdffd",
            "duration": "300",
            "letter": {
              "id": "string",
              "room_id": 0,
              "radio_name": "テク子",
              "message": "流れるの楽しみにしてます！",
              "created_at": "2022-10-06T07:10:04.799Z",
              "updated_at": "2022-10-06T07:10:04.799Z"
            }
          }
        ],
        "letters": [
          {
            "id": "string",
            "room_id": 0,
            "radio_name": "テク子",
            "message": "流れるの楽しみにしてます！",
            "created_at": "2022-10-06T07:10:04.799Z",
            "updated_at": "2022-10-06T07:10:04.799Z",
            "musics": [
              {
                "id": 1,
                "provided_music_id": "spotify:track:67T4aWFCAbMNWKamvI3piH",
                "letter_id": "string",
                "artists": "BUMP OF CHICKEN, 初音ミク",
                "album": "ray",
                "name": "ray",
                "thumbnail": "https://i.scdn.co/image/ab67616d0000b2731bc3a96706495fb0a1dbdffd",
                "duration": "300"
              }
            ]
          }
        ]
      }
    `))
  )
})
