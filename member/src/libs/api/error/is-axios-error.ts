import axios, { AxiosError } from 'axios'

export const isAxiosError = (error: unknown): error is AxiosError => {
  return !!axios.isAxiosError(error)
}
