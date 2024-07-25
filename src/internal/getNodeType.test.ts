import test from "ava"

import type {Element} from "slate"

import type {RichText} from "./type/RichText.js"
import type {Link} from "./type/Link.js"

import {ELEMENT_LINK} from "./constants.js"

import {getNodeType} from "./getNodeType.js"

test("Returns Text for text node", t => {
  const node: RichText = {
    text: "Some text",
    subscript: true
  }

  const expected = "Text"
  const actual = getNodeType(node)

  t.is(actual, expected)
})

test("Returns Node<type> for element node", t => {
  const node: Link = {
    type: ELEMENT_LINK,
    url: "https://example.com/",
    children: [
      {
        text: "Example URL"
      }
    ]
  }

  const expected = `Node<"${ELEMENT_LINK}">`
  const actual = getNodeType(node)

  t.is(actual, expected)
})

test("Returns Node<unknown> for an element node without type property", t => {
  const node: Element = {
    children: [
      {
        text: "Unknown node type"
      }
    ]
  }

  const expected = 'Node<"unknown">'

  // @ts-expect-error
  const actual = getNodeType(node)

  t.is(actual, expected)
})
