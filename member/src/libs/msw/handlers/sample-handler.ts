import { rest } from 'msw'

export const sampleHandler = rest.get('/api/users', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ])
  )
})
