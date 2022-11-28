import {
  ZodiosBodyByPath,
  ZodiosResponseByPath,
  ZodiosPathsByMethod,
} from '@zodios/core'
import { Ref } from 'nuxt/dist/app/compat/capi'
import { APIClient, Post } from '~~/src/utils/apiClient'

export type CreatePostBody = ZodiosBodyByPath<APIClient, 'post', '/posts'>
export type hoge = ZodiosPathsByMethod<APIClient, 'post'>
export type CreatePostResponse = ZodiosResponseByPath<
  APIClient,
  'post',
  '/posts'
>

export const useCreatePost = async (body: Ref<CreatePostBody>) => {
  const posts = ref<Post[]>([])
  const { data, execute, pending } = await useAsyncData<CreatePostResponse>(
    'createPost',
    () =>
      $fetch('/api/post', {
        method: 'POST',
        body: body.value,
      }),
    {
      initialCache: false,
      immediate: false,
      watch: [body],
    }
  )
  watch(data, (newData) => {
    if (newData) {
      posts.value.push({ ...newData })
    }
  })
  return { posts, execute, pending }
}
