import type {Descendant} from "./type/Descendant.js"
import type {NodeProps} from "./createNodeProps.js"

import {getNodeType} from "./getNodeType.js"

export class NoMatcherError<T extends Descendant> extends Error {
  readonly code = "SLATE_TO_REACT_NO_MATCHER_ERROR"

  constructor(props: NodeProps<T>) {
    super(`Cannot find transform for node ${getNodeType(props)}`)

    Error.captureStackTrace(this, this.constructor)
  }
}
