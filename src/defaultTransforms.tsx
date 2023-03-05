import React from "react"

import type {ReactNode} from "react"

import {createNodeTransform} from "./createNodeTransform.js"
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,

  ELEMENT_BLOCKQUOTE,
  ELEMENT_PARAGRAPH,
  ELEMENT_LINK,
} from "./internal/constants.js"
import type {
  RichText,
  Paragraph,
  Heading,
  Blockquote,
  Link,
  Transform
} from "./types.js"

const text = createNodeTransform<RichText>(
  "text",

  ({key, node, children}) => {
    // Render <br /> for empty text blocks as it's probably just an empty line
    let element: ReactNode = children || <br />

    if (node.bold) {
      element = <strong>{element}</strong>
    }

    if (node.italic) {
      element = <i>{element}</i>
    }

    if (node.underline) {
      element = <u>{element}</u>
    }

    if (node.strikethrough) {
      element = <s>{element}</s>
    }

    if (node.superscript) {
      element = <sup>{element}</sup>
    } else if (node.subscript) {
      element = <sub>{element}</sub>
    }

    if (node.code) {
      element = <code>{element}</code>
    }

    return <span key={key}>{element}</span>
  }
)

const paragraph = createNodeTransform<Paragraph>(
  ELEMENT_PARAGRAPH,

  ({key, node, children}) => (
    <p key={key} style={{textAlign: node.align}}>
      {children}
    </p>
  )
)

const h1 = createNodeTransform<Heading<"h1">>(
  ELEMENT_H1,

  ({key, node, children}) => (
    <h2
      key={key}
      style={{textAlign: node.align}}
    >
      {children}
    </h2>
  )
)

const h2 = createNodeTransform<Heading<"h2">>(
  ELEMENT_H2,

  ({key, node, children}) => (
    <h2
      key={key}
      style={{textAlign: node.align}}
    >
      {children}
    </h2>
  )
)

const h3 = createNodeTransform<Heading<"h3">>(
  ELEMENT_H3,

  ({key, node, children}) => (
    <h3
      key={key}
      style={{textAlign: node.align}}
    >
      {children}
    </h3>
  )
)

const h4 = createNodeTransform<Heading<"h4">>(
  ELEMENT_H4,

  ({key, node, children}) => (
    <h4
      key={key}
      style={{textAlign: node.align}}
    >
      {children}
    </h4>
  )
)

const h5 = createNodeTransform<Heading<"h5">>(
  ELEMENT_H5,

  ({key, node, children}) => (
    <h4
      key={key}
      style={{textAlign: node.align}}
    >
      {children}
    </h4>
  )
)

const h6 = createNodeTransform<Heading<"h6">>(
  ELEMENT_H6,

  ({key, node, children}) => (
    <h4
      key={key}
      style={{textAlign: node.align}}
    >
      {children}
    </h4>
  )
)

const link = createNodeTransform<Link>(
  ELEMENT_LINK,

  ({key, node, children}) => (
    <a key={key} href={node.url}>
      {children}
    </a>
  )
)

const blockquote = createNodeTransform<Blockquote>(
  ELEMENT_BLOCKQUOTE,

  ({key, children}) => (
    <blockquote key={key}>
      {children}
    </blockquote>
  )
)

export const defaultTransforms: Record<string, Transform> = Object.fromEntries([
  text, blockquote, paragraph, link, h1, h2, h3, h4, h5, h6
])
