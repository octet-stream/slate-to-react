import {
  createLeafNodeMatcher
} from "./createNodeMatcher.js"
import type {
  LeafTransformProps
} from "./createTransform.js"

import type {RichText, Link} from "../types.js"

/**
 * Checks if given node is of `RichText` type
 *
 * @api private
 */
export const isRichText = createLeafNodeMatcher<RichText>(
  (node): node is LeafTransformProps<RichText> => (
    typeof node.leaf.text === "string" && (
      typeof node.leaf.bold === "boolean"
        || typeof node.leaf.italic === "boolean"
        || typeof node.leaf.strikethrough === "boolean"
        || typeof node.leaf.underline === "boolean"
        || typeof node.leaf.subscript === "boolean"
        || typeof node.leaf.superscript === "boolean"
        || typeof node.leaf.code === "boolean"
    )
  )
)
