import type {Descendant} from "../internal/type/Descendant.js"

import {BaseError} from "../internal/BaseError.js"
import {getNodeType} from "../internal/getNodeType.js"
import {createErrorCode} from "../internal/createErrorCode.js"

const code = createErrorCode("NO_MATCHER")

export class NoMatcherError<
  TNode extends Descendant
> extends BaseError<typeof code> {
  constructor(node: TNode) {
    super({
      code,
      message: `Cannot find transform for node ${getNodeType(node)}`
    })
  }
}
