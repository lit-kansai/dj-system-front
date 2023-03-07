export const logger = {
  log: (...data: unknown[]) => {
    /* eslint-disable no-console */
    if (process.env.NODE_ENV !== 'production') { console.log(...data) }
  }
}
