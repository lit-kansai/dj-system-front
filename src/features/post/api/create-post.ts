// NOTE: sample
import { Ref } from 'nuxt/dist/app/compat/capi'
import {
  sampleApiClient,
  ApiInstance as APIInstance,
  APIRequestOutput,
} from '@/libs'
import { Post } from '@/features/post'

// NOTE: ここガチでクソ複雑だけどしゃーないです(補完あるから耐えてはいる)
// というかaspida側で良い感じに書けるようにしてほしい笑
// こっちでUtility用意するのもあり(がんばります)
export type CreatePostInput = Parameters<
  APIInstance['api']['posts']['$post']
>[0]['body']
export type CreatePostOutput = APIRequestOutput<Post>['post']

export const createPost = (body: CreatePostInput): CreatePostOutput => {
  const pending: Ref<boolean> = ref(false)
  const data: Ref<Post | null> = ref(null)
  const error: Ref<true | Error | null> = ref(null)
  const execute: () => Promise<void> = async () => {
    try {
      pending.value = true
      const response = await sampleApiClient.api.posts.$post({ body })
      data.value = response
      pending.value = false
    } catch (_error) {
      pending.value = false
      _error instanceof Error ? (error.value = _error) : (error.value = true)
    }
  }

  return { pending, data, error, execute }
}
