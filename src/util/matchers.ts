import type {Text} from "slate"

import {
  createLeafNodeMatcher,
  createElementNodeMatcher
} from "./createNodeMatcher.js"
import type {
  LeafTransformProps,
  ElementTransformProps
} from "./createTransform.js"

import type {Link, Paragraph, Blockquote, Heading} from "../types.js"
import {
  ELEMENT_LINK,
  ELEMENT_PARAGRAPH,
  ELEMENT_BLOCKQUOTE,
  HEADINGS_LIST,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6
} from "./constants.js"

/**
 * Checks if given node is of `Text` type
 *
 * @api public
 */
export const isText = createLeafNodeMatcher<Text>(
  (node): node is LeafTransformProps<Text> => (
    typeof node.leaf.text === "string"
  )
)

/**
 * Checks if given node is of `Link` type
 *
 * @api public
 */
export const isLink = createElementNodeMatcher<Link>(
  (node): node is ElementTransformProps<Link> => (
    node.element.type === ELEMENT_LINK && typeof node.element.url === "string"
  )
)

/**
 * Checks if given node is of `Paragraph` type
 *
 * @api public
 */
export const isParagraph = createElementNodeMatcher<Paragraph>(
  (node): node is ElementTransformProps<Paragraph> => (
    node.element.type === ELEMENT_PARAGRAPH
  )
)

/**
 * Checks if given node is of `Blockquote` type
 *
 * @api public
 */
export const isBlockquote = createElementNodeMatcher<Blockquote>(
  (node): node is ElementTransformProps<Blockquote> => (
    node.element.type === ELEMENT_BLOCKQUOTE
  )
)

/**
 * Checks if given node is one of the valid `Heading` variants
 *
 * @api public
 */
export const isHeading = createElementNodeMatcher<Heading>(
  (node): node is ElementTransformProps<Heading> => (
    HEADINGS_LIST.includes(node.element.type)
  )
)

/**
 * Checks if given node is of `H1` heading type
 *
 * @api public
 */
export const isH1 = createElementNodeMatcher<Heading<typeof ELEMENT_H1>>(
  (node): node is ElementTransformProps<Heading<typeof ELEMENT_H1>> => (
    node.element.type === ELEMENT_H1
  )
)

/**
 * Checks if given node is of `H2` heading type
 *
 * @api public
 */
export const isH2 = createElementNodeMatcher<Heading<typeof ELEMENT_H2>>(
  (node): node is ElementTransformProps<Heading<typeof ELEMENT_H2>> => (
    node.element.type === ELEMENT_H2
  )
)

/**
 * Checks if given node is of `H3` heading type
 *
 * @api public
 */
export const isH3 = createElementNodeMatcher<Heading<typeof ELEMENT_H3>>(
  (node): node is ElementTransformProps<Heading<typeof ELEMENT_H3>> => (
    node.element.type === ELEMENT_H3
  )
)

/**
 * Checks if given node is of `H4` heading type
 *
 * @api public
 */
export const isH4 = createElementNodeMatcher<Heading<typeof ELEMENT_H4>>(
  (node): node is ElementTransformProps<Heading<typeof ELEMENT_H4>> => (
    node.element.type === ELEMENT_H4
  )
)

/**
 * Checks if given node is of `H5` heading type
 *
 * @api public
 */
export const isH5 = createElementNodeMatcher<Heading<typeof ELEMENT_H5>>(
  (node): node is ElementTransformProps<Heading<typeof ELEMENT_H5>> => (
    node.element.type === ELEMENT_H5
  )
)

/**
 * Checks if given node is of `H6` heading type
 *
 * @api public
 */
export const isH6 = createElementNodeMatcher<Heading<typeof ELEMENT_H6>>(
  (node): node is ElementTransformProps<Heading<typeof ELEMENT_H6>> => (
    node.element.type === ELEMENT_H6
  )
)
