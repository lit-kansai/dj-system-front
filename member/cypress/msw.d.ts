import { rest, SetupWorker } from 'msw'

declare global {
  interface Window {
    msw: {
      worker: SetupWorker
      rest: typeof rest
    }
  }
}
