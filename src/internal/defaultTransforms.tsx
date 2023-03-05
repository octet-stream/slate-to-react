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

import {isRichText, isPlainText} from "./matchers.js"

const RichText = createLeafTransform(
  isRichText,

  ({key, attributes, leaf, children}) => {
    // Render <br /> for empty text blocks as it's probably just an empty line
    let element: ReactNode = children || <br />

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

    if (leaf.superscript) {
      element = <sup>{element}</sup>
    } else if (leaf.subscript) {
      element = <sub>{element}</sub>
    }

    if (leaf.code) {
      element = <code>{element}</code>
    }

    return <span {...attributes} key={key}>{element}</span>
  }
)

const PlainText = createLeafTransform(
  isPlainText,

  ({key, attributes, children}) => (
    <span {...attributes} key={key}>
      {children}
    </span>
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
