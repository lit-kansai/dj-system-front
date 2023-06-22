import axios from 'axios'
import { ZodError } from 'zod'
import { APIClientError } from './api-client-error'
import { UnexpectedError } from './unexpected-error'
import { getAxiosErrorDetail } from './get-axios-error-detail'

export function handleAPIClientError(error: APIClientError): string {
  if (axios.isAxiosError(error)) {
    return getAxiosErrorDetail(error)
  } else if (error instanceof ZodError) {
    return 'レスポンスの変換でエラーが発生しました。'
  } else if (error instanceof UnexpectedError) {
    return '予期せぬエラーが発生しました。'
  } else {
    return '予期せぬエラーが発生しました。'
  }
}
