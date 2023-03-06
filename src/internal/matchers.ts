import type {Text} from "slate"

import type {LeafProps} from "../internal/createNodeProps.js"

import {createLeafNodeMatcher} from "../public/createNodeMatcher.js"
import {isSuperscriptRichText} from "./isSuperscriptRichText.js"
import {isSubscriptRichText} from "./isSubscriptRichText.js"

import type {RichText} from "./type/RichText.js"

/**
 * Checks if given node is of `RichText` type
 *
 * @api private
 */
export const isRichText = createLeafNodeMatcher<RichText>(
  (node): node is LeafProps<RichText> => (
    typeof node.leaf.text === "string" && !!(
      typeof node.leaf.bold === "boolean"
        || typeof node.leaf.italic === "boolean"
        || typeof node.leaf.strikethrough === "boolean"
        || typeof node.leaf.underline === "boolean"
        || typeof node.leaf.code === "boolean"
        || (isSubscriptRichText(node.leaf) || isSuperscriptRichText(node.leaf))
    )
  )
)

/**
 * Matches **only** plain text nodes
 *
 * @api private
 */
export const isPlainText = createLeafNodeMatcher<Text>(
  (node): node is LeafProps<Text> => (
    typeof node.leaf.text === "string" && !isRichText(node)
  )
)
