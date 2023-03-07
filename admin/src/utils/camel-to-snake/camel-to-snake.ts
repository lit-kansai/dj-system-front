import { isRecord } from '../is-record'

export const camelToSnake = (obj: unknown): unknown => {
  if (!obj) { return null }
  if (Array.isArray(obj)) { return obj.map(camelToSnake) }
  if (isRecord(obj)) {
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
      acc[toSnake(key)] = value
      return acc
    }, {})
  }
  return obj
}

const toSnake = (key: string) => {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase()
}
