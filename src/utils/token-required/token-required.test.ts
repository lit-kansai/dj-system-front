import { describe, it, expect } from 'vitest'
import { tokenRequired } from './token-required'

describe('token-required', () => {
  it('正常系', () => {
    expect(tokenRequired('/mc')).toBe(true)
  })

  it('空が渡された時', () => {
    expect(tokenRequired('')).toBe(false)
  })

  it('途中が該当する時', () => {
    expect(tokenRequired('/room/mc')).toBe(false)
  })
})
