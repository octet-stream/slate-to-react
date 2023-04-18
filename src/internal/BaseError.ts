export interface BaseErrorParams<TCode extends string> {
  message: string
  code: TCode
}

export class BaseError<TCode extends string> extends Error {
  readonly code: TCode

  constructor({code, message}: BaseErrorParams<TCode>) {
    super(message)

    this.code = code

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
