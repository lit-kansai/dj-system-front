type SnakeToCamelCase<T extends string> =
T extends `${infer R}_${infer U}` ? `${R}${Capitalize<SnakeToCamelCase<U>>}` : T

/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable @typescript-eslint/indent  */
export type SnakeToCamel<T extends object | any[]> = {
  [K in keyof T as `${SnakeToCamelCase<string & K>}`]:
    T[K] extends (infer U extends any[]) | undefined ? Array<SnakeToCamel<U[number]>> | undefined :
    T[K] extends any[] ? Array<SnakeToCamel<T[K][number]>> :
    T[K] extends object ? SnakeToCamel<T[K]> : T[K]
}
