import { AxiosError } from 'axios'
import { ZodError } from 'zod'
import { UnexpectedError } from './unexpected-error'

export type APIClientError = AxiosError | ZodError | UnexpectedError
