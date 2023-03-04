import React, {createElement} from "react"

import {createElementTransform, createLeafTransform} from "./createTransform.js"

import {
  isText,
  isLink,
  isParagraph,
  isBlockquote,
  isHeading
} from "./matchers.js"

const text = createLeafTransform(isText, ({attributes, children}) => (
  <span {...attributes}>{children}</span>
))

const link = createElementTransform(
  isLink,

  ({key, attributes, element, children}) => (
    <a {...attributes} key={key} href={element.url}>
      {children}
    </a>
  )
)

const paragraph = createElementTransform(
  isParagraph,

  ({key, attributes, element, children}) => (
    <p {...attributes} key={key} style={{textAlign: element.align}}>
      {children}
    </p>
  )
)

const blockquote = createElementTransform(
  isBlockquote,

  ({key, attributes, children}) => (
    <blockquote {...attributes} key={key}>
      {children}
    </blockquote>
  )
)

const heading = createElementTransform(
  isHeading,

  ({key, element, attributes, children}) => createElement(
    element.type,

    {
      ...attributes, key
    },

    children
  )
)

export const defaultTransforms = {
  text,
  link,
  paragraph,
  blockquote,
  heading
}
