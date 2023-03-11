export type Object = Record<string, unknown>

export type ObjectType = Object | Object[]

export const isObjectArray = (obj: ObjectType[]): obj is Object[] => {
  for (const value of obj) {
    if (Array.isArray(value)) { return false }
  }
  return true
}
