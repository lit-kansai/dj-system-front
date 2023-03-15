import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { apiClient, ApiInstance, PostRequestOutput } from '@/libs'

export type SearchMusicResponse = CamelizedAPIResponse<ReturnType<ApiInstance['room']['_roomId']>['music']['search']['$get']>

export type SearchMusicInput = {
  roomId: string,
  query: string
}

const responseSchema = toSchema<SearchMusicResponse>()(
  z.array(
    z.object({
      id: z.string(),
      artists: z.string(),
      album: z.string(),
      name: z.string(),
      thumbnail: z.string(),
      duration: z.number()
    })
  )
)
export const searchMusics = (input: SearchMusicInput): PostRequestOutput<SearchMusicResponse> => {
  const result = useLazyAsyncData(async () => {
    const response = await apiClient().room._roomId(input.roomId).music.search.$get({
      // HELP: ここ型つかない？(Swagger頑張ればワンチャンある？)
      query: { q: input.query }
    })
    const parseResult = responseSchema.safeParse(response)
    if (!parseResult.success) {
      // const { setCurrentError } = useCurrentError()
      // setCurrentError(parseResult.error)
      // throw parseResult.error
      throw parseResult.error
    }
    return parseResult.data
  }, {
    immediate: false
  })
  result.pending.value = false
  return result
}
