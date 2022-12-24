// NOTE: sample
import { sampleApiClient, APIRequestOutput } from '@/libs'
import { Posts } from '@/features/post'

export type GetPostsOutput = APIRequestOutput<Posts>['get']

export const getPosts = async (): GetPostsOutput => {
  const response = await useLazyAsyncData(() =>
    sampleApiClient.api.posts.$get()
  )
  return response
}
