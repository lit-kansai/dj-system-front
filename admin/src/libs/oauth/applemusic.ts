import { IntegrateAppleMusic, getApplemusicAccessToken } from '@/features/auth/api'

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
  return true
}
