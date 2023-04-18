import type {Descendant} from "../internal/type/Descendant.js"

import {BaseError} from "../internal/BaseError.js"
import {getNodeType} from "../internal/getNodeType.js"
import {createErrorCode} from "../internal/createErrorCode.js"

const code = createErrorCode("NO_MATCHER")

export class NoMatcherError<
  T extends Descendant
> extends BaseError<typeof code> {
  constructor(props: T) {
    super({
      code,
      message: `Cannot find transform for node ${getNodeType(props)}`
    })
  }
}
