import axios, { AxiosError } from 'axios'
import { ZodError } from 'zod'
import { getAxiosErrorDetail } from './get-axios-error-detail'
import { UnexpectedError } from './unexpected-error'
interface ErrorHandlers {
  onAxiosError: (error: AxiosError) => void;
  onZodError: (error: ZodError) => void;
  onUnexpectedError: (error: UnexpectedError) => void;
}

export const handleAPIClientError = (
  error: Error,
  handlers: ErrorHandlers = {
    onAxiosError: error => console.error('AxiosError: ', error),
    onZodError: error => console.error('ZodError:', error),
    onUnexpectedError: error => console.log('UnexpectedError:', error)
  }
) => {
  if (axios.isAxiosError(error)) {
    handlers.onAxiosError(error)
  } else if (error instanceof ZodError) {
    handlers.onZodError(error)
  } else if (error instanceof UnexpectedError) {
    handlers.onUnexpectedError(error)
  } else {
    console.error('Unknown error:', error)
  }
}
