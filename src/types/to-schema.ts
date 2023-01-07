import { ZodType } from 'zod'

export const toSchema =
  /* eslint-disable @typescript-eslint/no-explicit-any */
  <T>() => < S extends ZodType<T, any, any>>(arg: S): S => arg
