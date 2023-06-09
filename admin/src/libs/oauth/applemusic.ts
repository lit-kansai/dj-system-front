import { IntegrateAppleMusic, getApplemusicAccessToken } from '@/features/auth/api'
import { getUser } from '@/features/user'

export const applemusic = async () => {
  let musicUserToken: string | null = null

  const { data } = await getApplemusicAccessToken()
  if (data.value == null) { return }
  const accessToken = data.value?.accessToken

  try {
    await MusicKit.configure({
      developerToken: accessToken,
      app: {
        name: 'DJGassi',
      }
    })
    const music = MusicKit.getInstance()
    await music.authorize()
    musicUserToken = music.musicUserToken
  } catch (err) {
  }

  if (musicUserToken == null) { return false }
  await IntegrateAppleMusic({ musicUserToken: musicUserToken!, accessToken: accessToken! })

  const { data: userData, error } = await getUser()
  if (error.value) { throw new Error(JSON.stringify(error.value)) }
  useUserState().setState(userData.value)
  return true
}
