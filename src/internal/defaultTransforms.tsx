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
  isHeading
} from "../public/matchers.js"

import {isSuperscriptRichText} from "./isSuperscriptRichText.js"
import {isSubscriptRichText} from "./isSubscriptRichText.js"
import {isRichText, isPlainText} from "./matchers.js"

export const RichText = createLeafTransform(
  isRichText,

  ({attributes, leaf, children}) => {
    // Render <br /> for empty text blocks as it's probably just an empty line
    if (!children) {
      return <br {...attributes} />
    }

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

export const PlainText = createLeafTransform(
  isPlainText,

  ({attributes, children}) => (
    children ? (
      <span {...attributes}>
        {children}
      </span>
    ) : (
      <br {...attributes} />
    )
  )
)

const Link = createElementTransform(
  isLink,

  ({attributes, element, children}) => (
    <a {...attributes} href={element.url}>
      {children}
    </a>
  )
)

export const Paragraph = createElementTransform(
  isParagraph,

  ({attributes, element, children}) => (
    <p {...attributes} style={{textAlign: element.align}}>
      {children}
    </p>
  )
)

export const Blockquote = createElementTransform(
  isBlockquote,

  ({attributes, children}) => (
    <blockquote {...attributes}>
      {children}
    </blockquote>
  )
)

export const Heading = createElementTransform(
  isHeading,

  ({element, attributes, children}) => (
    createElement(element.type, attributes, children)
  )
)

export const leaves = [RichText, PlainText]

export const elements = [Paragraph, Link, Blockquote, Heading]
