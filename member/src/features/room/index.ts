import { getRoomOverview } from './api'
import { roomOverviewResponseHandler } from './mock'
export * from './types'
export * from './composables'
export const room = {
  api: {
    getRoomOverview
  },
  msw: {
    roomOverviewResponseHandler
  }
}
