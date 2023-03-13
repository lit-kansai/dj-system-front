import { rest } from 'msw'

export const errorHandler = rest.get('/error', (_, res, ctx) => {
  return res(
    ctx.status(401),
    ctx.json({
      code: '401',
      message: 'token is required'
    })
  )
})
