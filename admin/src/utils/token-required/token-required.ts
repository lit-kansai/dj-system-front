import { EXCEPTION_ENDPOINTS, TOKEN_REQUIRED_PATHS } from '@/constants/endpoints'

export const tokenRequired = (path: string): boolean => {
  /* NOTE: TOKEN_REQUIRED_PATHSを含んでいるけど認証がいらないやつはfalseでリターン
  */
  for (const endpoint of EXCEPTION_ENDPOINTS) {
    if (path === endpoint) { return false }
  }
  for (const path of TOKEN_REQUIRED_PATHS) {
    const regex = new RegExp(`^${path}`)
    if (regex.test(path)) { return true }
  }
  return false
}
