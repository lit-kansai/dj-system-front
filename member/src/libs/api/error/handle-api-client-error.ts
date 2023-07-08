import axios, { AxiosError } from 'axios'
import { ZodError } from 'zod'
import { APIClientError } from './api-client-error'
import { UnexpectedError } from './unexpected-error'

export const handleAPIClientError = (
  error: APIClientError,
  onAxiosError: (error: AxiosError) => void = error => console.error('AxiosError:', error),
  onZodError: (error: ZodError) => void = error => console.error('ZodError:', error),
  onUnexpectedError: (error: UnexpectedError) => void = error => console.error('UnexpectedError:', error),
) => {
  if (axios.isAxiosError(error)) {
    onAxiosError(error)
  } else if (error instanceof ZodError) {
    onZodError(error)
  } else if (error instanceof UnexpectedError) {
    onUnexpectedError(error)
  } else {
    console.error('Unknown error:', error)
  }
}
