import { Zodios, ApiOf, makeApi } from '@zodios/core'
import { pluginFetch } from '@zodios/plugins'
import { z } from 'zod'

// ここはOpenAPIで自動生成したい；；

export const post = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
})

export type Post = z.infer<typeof post>

const api = makeApi([
  {
    method: 'get',
    path: '/posts',
    alias: 'getPosts',
    description: 'getPosts',
    response: z.string(),
  },
  {
    method: 'post',
    path: '/posts', // auto detect :id and ask for it in apiClient get params
    alias: 'createPost', // optionnal alias to call this endpoint with it
    description: 'createPost',
    response: post,
    parameters: [
      {
        name: 'user',
        type: 'Body',
        schema: post.omit({ id: true }),
      },
    ],
  },
])

export const apiClient = new Zodios('https://jsonplaceholder.typicode.com', api)

export type APIClient = ApiOf<typeof apiClient>
export type Hoge = keyof APIClient
