import { apiClient } from '~~/src/utils/apiClient'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await apiClient.createPost(body)
  return result
})
