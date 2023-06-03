import { rest } from 'msw'
import { SearchMusicResponse } from '../api'
export const mockSearchMusicResponse: SearchMusicResponse = [
  {
    id: 'spotify:track:7ajpbW6tBpqUI9foCtwlLw',
    artists: 'YOASOBI',
    album: '祝福',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273c5993ff2f059a0a5a7f6270b',
    name: '祝福',
    duration: '196'
  },
  {
    id: 'spotify:track:3dPtXHP0oXQ4HCWHsOA9js',
    artists: 'YOASOBI',
    album: '夜に駆ける',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273c5716278abba6a103ad13aa7',
    name: '夜に駆ける',
    duration: '261'
  },
  {
    id: 'spotify:track:0T4AitQuq8IJhWBWuZwkFA',
    artists: 'YOASOBI',
    album: '群青',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2735235b1b2b4feb3783e12a434',
    name: '群青',
    duration: '248'
  },
  {
    id: 'spotify:track:3FUCuf498nFHJXFYR1V9Bd',
    artists: 'YOASOBI',
    album: '三原色',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273d6efeab6484d518ae4b9cfd6',
    name: '三原色',
    duration: '224'
  },
  {
    id: 'spotify:track:6wKmxUeMJAoz2GpMrw95z5',
    artists: 'YOASOBI',
    album: 'ハルカ',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273bb6370163b04145ed2e87442',
    name: 'ハルカ',
    duration: '243'
  },
  {
    id: 'spotify:track:06XQvnJb53SUYmlWIhUXUi',
    artists: 'YOASOBI',
    album: '怪物',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273f609c79794752ed7ee0976b5',
    name: '怪物',
    duration: '206'
  },
  {
    id: 'spotify:track:1TXhBe3DnaOFc7onTbEoiB',
    artists: 'YOASOBI',
    album: 'セブンティーン',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2737f63f3d6c8b925a74145eb24',
    name: 'セブンティーン',
    duration: '199'
  },
  {
    id: 'spotify:track:4BE1OloRc9xwjyqA4wFFuN',
    artists: 'YOASOBI',
    album: 'あの夢をなぞって',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2730f46d80794891bde2dcbf1a8',
    name: 'あの夢をなぞって',
    duration: '242'
  },
  {
    id: 'spotify:track:62Lv9WcrfzJqhvYDbilJy3',
    artists: 'YOASOBI',
    album: 'たぶん',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2737b7d90956f81e0cc3f39d0b8',
    name: 'たぶん',
    duration: '258'
  },
  {
    id: 'spotify:track:1w2tdCsX2yKFjbh3wHII94',
    artists: 'YOASOBI',
    album: 'アドベンチャー',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b27310e4d66d067248fc0e6fa4ad',
    name: 'アドベンチャー',
    duration: '199'
  },
  {
    id: 'spotify:track:2pXmohBUnD5Li93sgpbPSg',
    artists: 'YOASOBI',
    album: 'もう少しだけ',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2734b1138de797f23e496b3f1c8',
    name: 'もう少しだけ',
    duration: '220'
  },
  {
    id: 'spotify:track:7HneEBTvTra2CRYsxgMOAi',
    artists: 'YOASOBI',
    album: 'ハルジオン',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b2734d9235ec4a344028f6c5876c',
    name: 'ハルジオン',
    duration: '198'
  }
]

export const searchMusicsHandler = rest.get(
  '/room/:roomId/music/search',
  (_, res, ctx) => res(ctx.json(mockSearchMusicResponse))
)
