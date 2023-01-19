export const TOKEN_REQUIRED_PATHS = ['/mc'] as const
export const EXCEPTION_ENDPOINTS = ['/mc/auth/signin', '/mc/auth/signin/callback'] as const
export const GOOGLE_API_CALLBACK_PATH = '/api/google/callback' as const
export const GOOGLE_API_CALLBACK_URL = `${window.origin}${GOOGLE_API_CALLBACK_PATH}`
export const SPOTIFY_API_CALLBACK_PATH = '/api/spotify/callback' as const
export const APPLE_MUSIC_API_CALLBACK_PATH = '/api/apple/callback' as const
export const LOGIN_PAGE = '/login' as const
