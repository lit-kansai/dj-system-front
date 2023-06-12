export type User = {
  id: number
  googleId: string
  email: string
  name: string
  icon: string
  isAdmin: boolean
  createdAt: string
  updatedAt: string
  linkedProviders?: Array<{ provider: string, isConnected: boolean }> | null | undefined
}

export type CurrentUser = User | null;
