import { isRecord, ObjectType, isObjectArray } from '../is-record'

export const camelToSnake = (obj: ObjectType): ObjectType => {
  if (Array.isArray(obj)) {
    const array = obj.map(camelToSnake)
    if (!isObjectArray(array)) { throw new Error('unknown error') }
    return array
  }
  return Object.keys(obj).reduce((
    acc: Record<string, unknown>, key: string
  ) => {
    // 値がobjectの場合は再帰的にconvertを実行
    const value = obj[key]
    if (isRecord(value)) {
      acc[toSnake(key)] = camelToSnake(value)
      return acc
    }
    if (Array.isArray(value)) {
      acc[toSnake(key)] = camelToSnake(value)
      return acc
    }
    acc[toSnake(key)] = obj[key]
    return acc
  }, {})
}

const toSnake = (key: string) => {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase()
}
