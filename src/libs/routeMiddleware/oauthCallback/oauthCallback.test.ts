import { describe, test, assert, expectTypeOf } from 'vitest'
import { oauthCallback } from './oauthCallback'
import {
  APPLE_MUSIC_API_CALLBACK_PATH,
  GOOGLE_API_CALLBACK_PATH,
  SPOTIFY_API_CALLBACK_PATH
} from '@/constants'

// @vitest-environment jsdom
describe('oauthCallback', () => {
  describe('google oauth', () => {
    test('正常系', () => {
      const query = {
        code: 'sample code',
      }
      oauthCallback(GOOGLE_API_CALLBACK_PATH, query, {
        google: async (params) => {
          expectTypeOf(params).toEqualTypeOf<{
            code: string
          }>(params)
          await Promise.resolve()
        },
        spotify: (_) => { assert.fail() },
        apple: (_) => { assert.fail() }
      })
    })
    test('queryが足りない時', () => {
      const query = {
        parameter: 'invalid parameter',
      }
      oauthCallback(GOOGLE_API_CALLBACK_PATH, query, {
        google: (_) => { assert.fail() },
        spotify: (_) => { assert.fail() },
        apple: (_) => { assert.fail() }
      })
      assert.isTrue(true)
    })
  })

  describe('正しくルーティングされているか', () => {
    const query = {
      code: 'sample code',
    }
    test('google', () => {
      oauthCallback(GOOGLE_API_CALLBACK_PATH, query, {
        google: async (_) => { assert.ok(true); await Promise.resolve() },
        spotify: (_) => { assert.fail() },
        apple: (_) => { assert.fail() }
      })
    })

    test('spotify', () => {
      oauthCallback(SPOTIFY_API_CALLBACK_PATH, query, {
        google: (_) => { assert.fail() },
        spotify: async (_) => { assert.ok(true); await Promise.resolve() },
        apple: (_) => { assert.fail() }
      })
    })
    test('google', () => {
      oauthCallback(APPLE_MUSIC_API_CALLBACK_PATH, query, {
        google: (_) => { assert.fail() },
        spotify: (_) => { assert.fail() },
        apple: async (_) => { assert.ok(true); await Promise.resolve() },
      })
    })
  })
})
