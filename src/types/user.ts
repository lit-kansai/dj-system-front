export type User = {
  id: number
  google_id: string
  email: string
  name: string
  icon: string
  is_admin: boolean
  created_at: string
  updated_at: string
  linked_providers?: Array<{provider: string, is_connected: boolean}> | undefined
}

export type CurrentUser = User | null;
