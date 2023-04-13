import {createErrorCode} from "../internal/createErrorCode.js"
import {BaseError} from "../internal/BaseError.js"

const code = createErrorCode("NO_ID_FIELD")

export class NodeNoIdFieldError extends BaseError<typeof code> {
  constructor() {
    super({code, message: "Node must have an ID field."})
  }
}
