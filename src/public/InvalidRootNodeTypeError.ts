import {createErrorCode} from "../internal/createErrorCode.js"
import {BaseError} from "../internal/BaseError.js"

const code = createErrorCode("INVALID_ROOT_NODE_TYPE")

export class InvalidRootNodeTypeError extends BaseError<typeof code> {
  constructor() {
    super({code, message: "Root elements must be of Node<T> type"})
  }
}
