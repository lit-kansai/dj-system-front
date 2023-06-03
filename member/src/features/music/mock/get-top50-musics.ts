import { rest } from 'msw'
import { GetTop50MusicsResponse } from '../api'

export const mockGetTop50MusicsResponse: GetTop50MusicsResponse = [
  {
    id: 'spotify:track:49F3htNmwzPKFycPdOrDvf',
    artists: 'Official髭男dism',
    album: 'Subtitle',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273d69b54199b7773b97a57a196',
    name: 'Subtitle',
    duration: '305'
  },
  {
    id: 'spotify:track:10zz9RZt9DnqcxNWksRNrx',
    artists: 'Vaundy',
    album: 'strobo',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2736da83ea7813b3b8d1bd22a87',
    name: '怪獣の花唄',
    duration: '224'
  },
  {
    id: 'spotify:track:16yajBS7lk0QAa5CZnTHo9',
    artists: 'ヤングスキニー',
    album: '歌にしてしまえば、どんなことでも許されると思っていた',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b27333d127d38a5cd9de2c2079c1',
    name: '本当はね、',
    duration: '201'
  },
  {
    id: 'spotify:track:78NUnAsLzE6azxvuPDy9M7',
    artists: '百足, 韻マン',
    album: '君のまま',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273b84e5ef0604176e68584dc79',
    name: '君のまま',
    duration: '177'
  },
  {
    id: 'spotify:track:2Dzzhb1oV5ckgOjWZLraIB',
    artists: 'なとり',
    album: 'Overdose',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273d29582617459e5bb81bd90a6',
    name: 'Overdose',
    duration: '197'
  },
  {
    id: 'spotify:track:7w6NWogvAAFdEhD9MA2uvv',
    artists: '米津玄師',
    album: 'LADY',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2731ed02be53f30035e33b20066',
    name: 'LADY',
    duration: '207'
  },
  {
    id: 'spotify:track:65FftemJ1DbbZ45DUfHJXE',
    artists: 'NewJeans',
    album: "NewJeans 'OMG'",
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273d70036292d54f29e8b68ec01',
    name: 'OMG',
    duration: '212'
  },
  {
    id: 'spotify:track:4NaaF28BeO9WzjDrSS71Nz',
    artists: 'Mrs. GREEN APPLE',
    album: 'ダンスホール',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273e552c9dbdf76676de1032ae0',
    name: 'ダンスホール',
    duration: '203'
  },
  {
    id: 'spotify:track:4IfrM44LofE9bSs6TDZS49',
    artists: 'Tani Yuuki',
    album: 'Memories',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273b5900aef5989a39a87bda771',
    name: 'W / X / Y',
    duration: '278'
  },
  {
    id: 'spotify:track:7M0dIdZWN1FDcveRdoOzbZ',
    artists: '優里',
    album: '弐',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273188327ac9022d86ad2dd6483',
    name: 'ビリミリオン',
    duration: '228'
  },
  {
    id: 'spotify:track:4QlSFkbRxZWkHDF1MqBaEY',
    artists: 'Vaundy',
    album: 'そんなbitterな話',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273ac7335e7cf4a2e994ab74bb6',
    name: 'そんなbitterな話',
    duration: '276'
  },
  {
    id: 'spotify:track:3khEEPRyBeOUabbmOPJzAG',
    artists: '米津玄師',
    album: 'KICK BACK',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273303d8545fce8302841c39859',
    name: 'KICK BACK',
    duration: '193'
  }
]

export const getTop50MusicsHandler = rest.get(
  '/room/:roomId/music/top',
  (_, res, ctx) => res(ctx.json(mockGetTop50MusicsResponse))
)
