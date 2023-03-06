import React, {createElement} from "react"
import type {ReactNode} from "react"

import {
  createElementTransform,
  createLeafTransform
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

const RichText = createLeafTransform(
  isRichText,

  ({attributes, leaf, children}) => {
    // Render <br /> for empty text blocks as it's probably just an empty line
    if (!children) {
      return <br />
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

const PlainText = createLeafTransform(
  isPlainText,

  ({attributes, children}) => (
    children ? (
      <span {...attributes}>
        {children}
      </span>
    ) : (
      <br />
    )
  )
)

const Link = createElementTransform(
  isLink,

  ({key, attributes, element, children}) => (
    <a {...attributes} key={key} href={element.url}>
      {children}
    </a>
  )
)

const Paragraph = createElementTransform(
  isParagraph,

  ({key, attributes, element, children}) => (
    <p {...attributes} key={key} style={{textAlign: element.align}}>
      {children}
    </p>
  )
)

const Blockquote = createElementTransform(
  isBlockquote,

  ({key, attributes, children}) => (
    <blockquote {...attributes} key={key}>
      {children}
    </blockquote>
  )
)

const Heading = createElementTransform(
  isHeading,

  ({key, element, attributes, children}) => createElement(
    element.type,

    {
      ...attributes, key
    },

    children
  )
)

export const leaves = [RichText, PlainText] as const

export const elements = [Paragraph, Link, Blockquote, Heading] as const
