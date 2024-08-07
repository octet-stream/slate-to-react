import type {EmptyText} from "./type/EmptyText.js"
import type {RichText} from "./type/RichText.js"

import {isSubscriptRichText} from "./isSubscriptRichText.js"
import {isSuperscriptRichText} from "./isSuperscriptRichText.js"

import {createLeafNodeMatcher} from "../public/createNodeMatcher.js"
import type {TextNode} from "../public/TextNode.js"

/**
 * Matches empty text nodes
 *
 * @api private
 */
export const isEmptyText = createLeafNodeMatcher<EmptyText>(
  (node): node is EmptyText => typeof node.text === "string" && node.text === ""
)

/**
 * Checks if given node is of `RichText` type
 *
 * @api private
 */
export const isRichText = createLeafNodeMatcher<RichText>(
  (node): node is RichText =>
    typeof node.text === "string" &&
    !!(
      typeof node.bold === "boolean" ||
      typeof node.italic === "boolean" ||
      typeof node.strikethrough === "boolean" ||
      typeof node.underline === "boolean" ||
      typeof node.code === "boolean" ||
      isSubscriptRichText(node) ||
      isSuperscriptRichText(node)
    ) &&
    !isEmptyText(node as EmptyText)
)

/**
 * Matches **only** plain text nodes
 *
 * @api private
 */
export const isPlainText = createLeafNodeMatcher<TextNode>(
  (node): node is TextNode =>
    typeof node.text === "string" &&
    !isRichText(node) &&
    !isEmptyText(node as EmptyText)
)
