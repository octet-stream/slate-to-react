const prefix = "SLATE_TO_REACT"
const suffix = "ERROR"

type ErrorCode<TBase extends string> =
  `${typeof prefix}_${TBase}_${typeof suffix}`

export const createErrorCode = <TBase extends string>(
  code: TBase
): ErrorCode<TBase> => `${prefix}_${code}_${suffix}`
