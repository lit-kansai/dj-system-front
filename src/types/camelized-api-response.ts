import { SnakeToCamel } from './snake-to-camel'
/* eslint-disable @typescript-eslint/no-explicit-any */
export type CamelizedAPIResponse<T extends (...args: any) => any> = SnakeToCamel<Awaited<ReturnType<T>>>
