import { isRecord, ObjectType, isObjectArray } from '../is-record'

export const snakeToCamel = (obj: ObjectType): ObjectType => {
  if (Array.isArray(obj)) {
    const array = obj.map(snakeToCamel)
    if (!isObjectArray(array)) { throw new Error('unknown error') }
    return array
  }
  return Object.keys(obj).reduce((
    acc: Record<string, unknown>, key: string
  ) => {
    // 値がobjectの場合は再帰的にconvertを実行
    const value = obj[key]
    if (isRecord(value)) {
      acc[toCamel(key)] = snakeToCamel(value)
      return acc
    }
    if (Array.isArray(value)) {
      acc[toCamel(key)] = snakeToCamel(value)
      return acc
    }
    acc[toCamel(key)] = obj[key]
    return acc
  }, {})
}

export const toCamel = (str: string) => {
  return str.replace(/_(\w)/g, (_match, capture) => {
    return capture.toUpperCase()
  })
}
