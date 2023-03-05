import type {ElementProps} from "../internal/createElementProps.js"
import type {LeafProps} from "../internal/createLeafProps.js"

import {getNodeType} from "./getNodeType.js"

export class NoMatcherError extends Error {
  readonly code = "SLATE_TO_REACT_NO_MATCHER_ERROR"

  constructor(props: ElementProps | LeafProps) {
    super(`Cannot find transform for node ${getNodeType(props)}`)

    Error.captureStackTrace(this, this.constructor)
  }
}
