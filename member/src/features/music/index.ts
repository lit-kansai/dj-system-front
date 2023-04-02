import { requestMusic, searchMusics, getTop50Musics } from './api'
import {
  getTop50MusicsHandler,
  requestMusicHandler,
  searchMusicsHandler
} from './mock'

export const music = {
  api: {
    requestMusic,
    searchMusics,
    getTop50Musics
  },
  msw: {
    getTop50MusicsHandler,
    requestMusicHandler,
    searchMusicsHandler
  }
}
