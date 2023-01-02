import { TOKEN_REQUIRED_ENDPOINTS } from '@/constants/endpoints'

export const tokenRequired = (target: string): boolean => {
  for (const endpoint of TOKEN_REQUIRED_ENDPOINTS) {
    const regex = new RegExp(`^${endpoint}`)
    if (regex.test(target)) { return true }
  }
  return false
}
