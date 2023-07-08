export class UnexpectedError extends Error {
  public code: number
  public additionalInfo: unknown
  public timestamp: string

  constructor(message: string, code: number, additionalInfo?: unknown) {
    super(message)
    this.name = 'UnexpectedError'
    this.code = code
    this.additionalInfo = additionalInfo
    this.timestamp = new Date().toISOString()
    this.stack = (new Error('UnexpectedError')).stack
  }
}
