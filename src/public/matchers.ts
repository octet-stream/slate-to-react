import type {Text} from "slate"

import {
  createLeafNodeMatcher,
  createElementNodeMatcher
} from "./createNodeMatcher.js"

import type {LeafProps, ElementProps} from "../internal/createNodeProps.js"
import type {Blockquote} from "../internal/type/Blockquote.js"
import type {Paragraph} from "../internal/type/Paragraph.js"
import type {Heading} from "../internal/type/Heading.js"
import type {Link} from "../internal/type/Link.js"

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
} from "../internal/constants.js"

/**
 * Checks if given node is of `Text` type
 *
 * @api public
 */
export const isText = createLeafNodeMatcher<Text>(
  (node): node is LeafProps<Text> => (
    typeof node.leaf.text === "string"
  )
)

/**
 * Checks if given node is of `Link` type
 *
 * @api public
 */
export const isLink = createElementNodeMatcher<Link>(
  (node): node is ElementProps<Link> => (
    node.element.type === ELEMENT_LINK && typeof node.element.url === "string"
  )
)

/**
 * Checks if given node is of `Paragraph` type
 *
 * @api public
 */
export const isParagraph = createElementNodeMatcher<Paragraph>(
  (node): node is ElementProps<Paragraph> => (
    node.element.type === ELEMENT_PARAGRAPH
  )
)

/**
 * Checks if given node is of `Blockquote` type
 *
 * @api public
 */
export const isBlockquote = createElementNodeMatcher<Blockquote>(
  (node): node is ElementProps<Blockquote> => (
    node.element.type === ELEMENT_BLOCKQUOTE
  )
)

/**
 * Checks if given node is one of the valid `Heading` variants
 *
 * @api public
 */
export const isHeading = createElementNodeMatcher<Heading>(
  (node): node is ElementProps<Heading> => (
    HEADINGS_LIST.includes(node.element.type)
  )
)

/**
 * Checks if given node is of `H1` heading type
 *
 * @api public
 */
export const isH1 = createElementNodeMatcher<Heading<typeof ELEMENT_H1>>(
  (node): node is ElementProps<Heading<typeof ELEMENT_H1>> => (
    node.element.type === ELEMENT_H1
  )
)

/**
 * Checks if given node is of `H2` heading type
 *
 * @api public
 */
export const isH2 = createElementNodeMatcher<Heading<typeof ELEMENT_H2>>(
  (node): node is ElementProps<Heading<typeof ELEMENT_H2>> => (
    node.element.type === ELEMENT_H2
  )
)

/**
 * Checks if given node is of `H3` heading type
 *
 * @api public
 */
export const isH3 = createElementNodeMatcher<Heading<typeof ELEMENT_H3>>(
  (node): node is ElementProps<Heading<typeof ELEMENT_H3>> => (
    node.element.type === ELEMENT_H3
  )
)

/**
 * Checks if given node is of `H4` heading type
 *
 * @api public
 */
export const isH4 = createElementNodeMatcher<Heading<typeof ELEMENT_H4>>(
  (node): node is ElementProps<Heading<typeof ELEMENT_H4>> => (
    node.element.type === ELEMENT_H4
  )
)

/**
 * Checks if given node is of `H5` heading type
 *
 * @api public
 */
export const isH5 = createElementNodeMatcher<Heading<typeof ELEMENT_H5>>(
  (node): node is ElementProps<Heading<typeof ELEMENT_H5>> => (
    node.element.type === ELEMENT_H5
  )
)

/**
 * Checks if given node is of `H6` heading type
 *
 * @api public
 */
export const isH6 = createElementNodeMatcher<Heading<typeof ELEMENT_H6>>(
  (node): node is ElementProps<Heading<typeof ELEMENT_H6>> => (
    node.element.type === ELEMENT_H6
  )
)
