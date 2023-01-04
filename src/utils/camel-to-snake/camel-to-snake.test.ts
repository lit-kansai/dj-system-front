import { describe, it, expect } from 'vitest'
import { camelToSnake } from '.'

describe('snake-to-camel', () => {
  it('正常系', () => {
    expect(camelToSnake({ firstName: 'name' })).toEqual({ first_name: 'name' })
  })

  it('配列', () => {
    expect(camelToSnake([{ firstName: 'name' }])).toEqual([{ first_name: 'name' }])
  })

  it('ネストするやつ', () => {
    expect(camelToSnake({ name: { firstName: 'name' } }))
      .toEqual({ name: { first_name: 'name' } })
  })

  it('ネストした先に配列があるやつ', () => {
    expect(camelToSnake({ names: [{ firstName: 'hoge' }] }))
      .toEqual({ names: [{ first_name: 'hoge' }] })
  })

  it('二重配列', () => {
    expect(camelToSnake([[{ firstName: 'name' }]]))
      .toEqual([[{ first_name: 'name' }]])
  })

  it('null', () => {
    expect(camelToSnake(null)).toEqual(null)
  })

  it('{}', () => {
    expect(camelToSnake({})).toEqual({})
  })

  it('プリミティブ', () => {
    expect(camelToSnake('name')).toEqual('name')
  })
})
