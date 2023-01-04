import { isRecord } from '../is-record'

export const snakeToCamel = (obj: unknown): unknown => {
  if (!obj) { return null }
  if (Array.isArray(obj)) { return obj.map(snakeToCamel) }
  if (isRecord(obj)) {
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
      acc[toCamel(key)] = value
      return acc
    }, {})
  }
  return obj
}

export const toCamel = (str: string) => {
  return str.replace(/_(\w)/g, (_match, capture) => {
    return capture.toUpperCase()
  })
}
