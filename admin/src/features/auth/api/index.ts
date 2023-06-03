import { getUserProvider } from './get-user-provider'
import { registerUser } from './register-user'
import { integrateSpotify } from './integrate-spotify'
import { getSpotifyOAuthUrl } from './get-spotify-oauth-url'
import { getLoginUrl } from './get-login-url'
import { logout } from './logout'
export * from './get-login-url'
export * from './get-user-provider'
export * from './register-user'
export * from './integrate-spotify'
export * from './get-spotify-oauth-url'
export * from './get-applemusic-access-token'
export * from './integrate-applemusic'
export const api = {
  getUserProvider,
  registerUser,
  integrateSpotify,
  getSpotifyOAuthUrl,
  getLoginUrl,
  logout
}
