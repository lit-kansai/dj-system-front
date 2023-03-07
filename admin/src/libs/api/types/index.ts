// prettier-ignore
/* eslint-disable */
import { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import { Ref } from 'nuxt/dist/app/compat/capi'

export type APIRequestError = true | Error | null
/* NOTE: Promiseで囲わないほうが良い？
   APIのレスポンスは全部Promiseでラップされてそうだからこれでも良い気がする。
*/
export type GetRequestOutput<Data extends {}> = Promise<_AsyncData<Data, APIRequestError>>

export type PostRequestOutput<Data extends {}> = {
  pending: Ref<boolean>
  data: Ref<Data | null>
  error: Ref<APIRequestError>
  execute: () => Promise<void>
}

export type APIRequestOutput<Data extends {}> = {
  get: Promise<_AsyncData<Data, APIRequestError>>
  post: PostRequestOutput<Data>
}
