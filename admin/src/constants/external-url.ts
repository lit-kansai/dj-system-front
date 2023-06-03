export const SPOTIFY_PLAYLIST_URL = (id: string) => {
  return `https://open.spotify.com/playlist/${id}`
}

export const APPLE_MUSIC_URL = (id: string) => {
  return `https://music.apple.com/library/playlist/${id}`
}

export const MEMBER_SITE_URL = () => useRuntimeConfig().public.MEMBER_SITE_URL

export const MEMBER_REQUEST_URL = (roomId: string) => {
  const { MEMBER_SITE_URL } = useRuntimeConfig().public
  return `${MEMBER_SITE_URL}/${roomId}`
}
