import { SnakeToCamel } from './snake-to-camel'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type CamelizedAPIResponse<T extends (...args: any) => any> =
  Awaited<ReturnType<T>> extends any[] ?
    Array<SnakeToCamel<Awaited<ReturnType<T>>[number]>> :
    SnakeToCamel<Awaited<ReturnType<T>>>

export type _CamelizedAPIResponse<T extends object | any[]> = SnakeToCamel<T>
