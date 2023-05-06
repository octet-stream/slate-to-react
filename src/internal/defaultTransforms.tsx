import type {ReactNode} from "react"
import {createElement} from "react"

import {
  createLeafTransform,
  createElementTransform
} from "../public/createTransform.js"
import {
  isLink,
  isParagraph,
  isBlockquote,
  isHeading,
} from "../public/matchers.js"

import {isRichText, isPlainText, isEmptyText} from "./matchers.js"
import {isSuperscriptRichText} from "./isSuperscriptRichText.js"
import {isSubscriptRichText} from "./isSubscriptRichText.js"

/**
 * Transforms empty text nodes to `<br />` tag.
 *
 * @api private
 */
export const EmptyText = createLeafTransform(
  isEmptyText,

  // Render <br /> for empty text blocks as it's probably just an empty line
  ({key, attributes}) => <br {...attributes} key={key} />
)

/**
 * Transforms `RichText` nodes using corresponding HTML tags.
 *
 * @api private
 */
export const RichText = createLeafTransform(
  isRichText,

  ({key, attributes, leaf, children}) => {
    let element: ReactNode = children

    if (leaf.bold) {
      element = <strong>{element}</strong>
    }

    if (leaf.italic) {
      element = <i>{element}</i>
    }

    if (leaf.underline) {
      element = <u>{element}</u>
    }

    if (leaf.strikethrough) {
      element = <s>{element}</s>
    }

    if (isSuperscriptRichText(leaf)) {
      element = <sup>{element}</sup>
    } else if (isSubscriptRichText(leaf)) {
      element = <sub>{element}</sub>
    }

    if (leaf.code) {
      element = <code>{element}</code>
    }

    return <span {...attributes} key={key}>{element}</span>
  }
)

/**
 * Transforms plain text to `<span>` tag.
 *
 * @api private
 */
export const PlainText = createLeafTransform(
  isPlainText,

  ({key, attributes, children}) => (
    <span {...attributes} key={key}>
      {children}
    </span>
  )
)

/**
 * Transforms `Link` nodes to `<a>` tag.
 *
 * @api private
 */
const Link = createElementTransform(
  isLink,

  ({key, attributes, element, children}) => (
    <a {...attributes} href={element.url} key={key}>
      {children}
    </a>
  )
)

/**
 * Transforms `Paragraph` nodes to `<p>` tag.
 * @api private
 */
export const Paragraph = createElementTransform(
  isParagraph,

  ({key, attributes, element, children}) => (
    <p {...attributes} style={{textAlign: element.align}} key={key}>
      {children}
    </p>
  )
)

/**
 * Transforms `Blockquote` nodes to `<blockquote>` tag.
 *
 * @api private
 */
export const Blockquote = createElementTransform(
  isBlockquote,

  ({key, attributes, children}) => (
    <blockquote {...attributes} key={key}>
      {children}
    </blockquote>
  )
)

/**
 * Transforms any valid `Heading` tag to corresponding heading HTML tag.
 *
 * @api private
 */
export const Heading = createElementTransform(
  isHeading,

  ({key, element, attributes, children}) => (
    createElement(element.type, {...attributes, key}, children)
  )
)

/**
 * List of default leaf node transforms
 *
 * @api private
 */
export const defaultLeaves = [EmptyText, RichText, PlainText]

/**
 * List of default element node transforms
 *
 * @api private
 */
export const defaultElements = [Paragraph, Link, Blockquote, Heading]
