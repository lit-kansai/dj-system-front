import { describe, it, expect } from 'vitest'
import { snakeToCamel } from '.'

describe('snake-to-camel', () => {
  it('正常系', () => {
    expect(snakeToCamel({ first_name: 'name' })).toEqual({ firstName: 'name' })
  })

  it('配列', () => {
    expect(snakeToCamel([{ first_name: 'name' }])).toEqual([{ firstName: 'name' }])
  })

  it('ネストするやつ', () => {
    expect(snakeToCamel({ name: { first_name: 'name' } }))
      .toEqual({ name: { firstName: 'name' } })
  })

  it('ネストした先に配列があるやつ', () => {
    expect(snakeToCamel({ names: [{ first_name: 'hoge' }] }))
      .toEqual({ names: [{ firstName: 'hoge' }] })
  })

  it('二重配列', () => {
    expect(snakeToCamel([[{ first_name: 'name' }]]))
      .toEqual([[{ firstName: 'name' }]])
  })

  it('null', () => {
    expect(snakeToCamel(null)).toEqual(null)
  })

  it('{}', () => {
    expect(snakeToCamel({})).toEqual({})
  })

  it('プリミティブ', () => {
    expect(snakeToCamel('name')).toEqual('name')
  })
})
