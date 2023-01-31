type SnakeToCamelCase<T extends string> =
T extends `${infer R}_${infer U}` ? `${R}${Capitalize<SnakeToCamelCase<U>>}` : T

/* eslint-disable @typescript-eslint/no-explicit-any */
export type SnakeToCamel<T extends object | any[]> = {
  [K in keyof T as `${SnakeToCamelCase<string & K>}`]-?:
  NonNullable<T[K]> extends any[] ? Array<SnakeToCamel<NonNullable<T[K]>[number]>> : T[K] extends object ? SnakeToCamel<T[K]> : T[K]
}

// export type Linked_provider = {
//   /** 音楽サービスの種類（"spotify" or "applemusic") */
//   provider: string
//   /** 連携されているかどうか */
//   is_connected: boolean
// }
//
// export type User = {
//   id: number
//   google_id: string
//   email: string
//   name: string
//   icon: string
//   is_admin: boolean
//   created_at: string
//   updated_at: string
//   linked_providers?: Linked_provider[] | undefined
// }
//
// const obj: SnakeToCamel<Pick<User, 'linked_providers'>> = {
//   [{
//     isConnected: true,
//     provider: 'string'
//   }]
// }
//
// type hoge = User['linked_providers'] extends any[] ? true : false
