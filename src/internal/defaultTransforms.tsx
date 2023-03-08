import React, {createElement} from "react"
import type {ReactNode} from "react"

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
  ({attributes}) => <br {...attributes} />
)

/**
 * Transforms `RichText` nodes using corresponding HTML tags.
 *
 * @api private
 */
export const RichText = createLeafTransform(
  isRichText,

  ({attributes, leaf, children}) => {
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

    return <span {...attributes}>{element}</span>
  }
)

/**
 * Transforms plain text to `<span>` tag.
 *
 * @api private
 */
export const PlainText = createLeafTransform(
  isPlainText,

  ({attributes, children}) => (
    <span {...attributes}>
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

  ({attributes, element, children}) => (
    <a {...attributes} href={element.url}>
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

  ({attributes, element, children}) => (
    <p {...attributes} style={{textAlign: element.align}}>
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

  ({attributes, children}) => (
    <blockquote {...attributes}>
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

  ({element, attributes, children}) => (
    createElement(element.type, attributes, children)
  )
)

/**
 * List of default leaf node transforms
 *
 * @api private
 */
export const leaves = [EmptyText, RichText, PlainText]

/**
 * List of default element node transforms
 *
 * @api private
 */
export const elements = [Paragraph, Link, Blockquote, Heading]
