import { z } from 'zod'
import { TokenFetcher } from '../interceptors'
import { USER_INFO } from '@/constants'
import { logger } from '@/libs/logger'

const localStorageSchema = z.object({
  apiToken: z.string()
})

export const local: TokenFetcher = {
  fetch: () => {
    const userInfo = localStorage.getItem(USER_INFO)
    if (!userInfo) { return null }
    const data = JSON.parse(userInfo)
    const result = localStorageSchema.safeParse(data)
    if (!result.success) { logger.log('token not found'); return null }
    return result.data.apiToken
  },
}
