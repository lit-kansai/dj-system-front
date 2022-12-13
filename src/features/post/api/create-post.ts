// NOTE: sample
import { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import { ApiInstance } from '@/api/$api'
import { apiClient } from '@/libs'

export type CreatePostInput = Parameters<
  ApiInstance['api']['posts']['$post']
>[0]['body']

export type Post = Awaited<ReturnType<ApiInstance['api']['posts']['$post']>>

// export type CreatePostOutput = ReturnType<typeof useAsyncData<Post>>
export type CreatePostOutput = Promise<_AsyncData<Post, true | Error | null>>

export const createPost = async (body: CreatePostInput): CreatePostOutput => {
  const response = await useAsyncData<Post>(
    () => apiClient.api.posts.$post({ body }),
    {
      initialCache: false,
      immediate: false,
      watch: [],
    }
  )
  return response
}
