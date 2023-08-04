import { AxiosError } from 'axios'
import { ZodError } from 'zod'
import { getAxiosErrorDetail } from './get-axios-error-detail'
import { handleAPIClientError } from './handle-api-client-error'

export const showAxiosError = (error: AxiosError) => {
  const statusCode = error.response?.status
  const statusMessage = getAxiosErrorDetail(error)
  const message = error.message
  showError({ statusCode, statusMessage, message, data: error })
}

export const showZodError = (error: ZodError) => {
  const statusCode = 0
  const statusMessage = 'Zod Parse Error'
  const message = error.issues.map((issue) => {
    const field = issue.path.join('.')
    const description = issue.message
    return `${field}: ${description}`
  }).join('\n')
  showError({ statusCode, statusMessage, message, data: error })
}

export const showUnexpectedError = (error: Error) => {
  const statusCode = 0
  const statusMessage = 'Unexpected Error'
  const message = '予期せぬエラーが発生しました'

  showError({ statusCode, statusMessage, message, data: error })
}

export const showErrorByErrorType = (error: Error) => {
  handleAPIClientError(error, {
    onAxiosError: showAxiosError,
    onZodError: showZodError,
    onUnexpectedError: showUnexpectedError,
  })
}
