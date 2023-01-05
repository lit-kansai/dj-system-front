type SnakeToCamelCase<T extends string> =
T extends `${infer R}_${infer U}` ? `${R}${Capitalize<SnakeToCamelCase<U>>}` : T

export type SnakeToCamel<T extends object> = {
  [K in keyof T as `${SnakeToCamelCase<string & K>}`]: T[K] extends object ? SnakeToCamel<T[K]> : T[K]
}
