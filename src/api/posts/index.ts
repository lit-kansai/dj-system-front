import { DefineMethods } from 'aspida'

export type Post = {
  id: number
  title: string
  body: string
  userId: number
}

export type Methods = DefineMethods<{
  get: {
    resBody: Post[]
  }
  post: {
    reqBody: Omit<Post, 'id'>
    reqHeaders: { authorization: string }
    resBody: Post
  }
}>
