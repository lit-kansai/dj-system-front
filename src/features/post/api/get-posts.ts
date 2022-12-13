// NOTE: sample
import { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import { ApiInstance } from '@/api/$api'
import { apiClient } from '@/libs'

export type Posts = Awaited<ReturnType<ApiInstance['api']['posts']['$get']>>

export type GetPostsOutput = Promise<_AsyncData<Posts, true | Error | null>>

export const getPosts = async (): GetPostsOutput => {
  const response = await useLazyAsyncData(() => apiClient.api.posts.$get())
  return response
}
