import test from "ava"

import type {RichText} from "./type/RichText.js"
import type {Link} from "./type/Link.js"

import {ELEMENT_LINK} from "./constants.js"
import {createLeafProps} from "./createLeafProps.js"
import {createElementProps} from "./createElementProps.js"

import {getNodeType} from "./getNodeType.js"

test("Returns Text for text node", t => {
  const node: RichText = {
    text: "Some text",
    subscript: true
  }

  const expected = "Text"
  const actual = getNodeType(createLeafProps(node))

  t.is(actual, expected)
})

test("Returns Element<type> for element node", t => {
  const node: Link = {
    type: ELEMENT_LINK,
    url: "https://example.com/",
    children: [{
      text: "Example URL"
    }]
  }

  const expected = `Element<${ELEMENT_LINK}>`
  const actual = getNodeType(createElementProps(node))

  t.is(actual, expected)
})
