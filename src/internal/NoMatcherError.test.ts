import test from "ava"

import type {Blockquote} from "./type/Blockquote.js"

import {createElementProps} from "./createElementProps.js"
import {ELEMENT_BLOCKQUOTE} from "./constants.js"
import {getNodeType} from "./getNodeType.js"

import {NoMatcherError} from "./NoMatcherError.js"

test("Creates NoMatcherError instance for given node props", t => {
  const node: Blockquote = {
    type: ELEMENT_BLOCKQUOTE,
    children: [{
      text: "I beat Twilight Sparkle and all I got was this lousy t-shirt."
    }]
  }

  const props = createElementProps(node)

  const expectedMessage = `Cannot find transform for node ${getNodeType(props)}`

  const actual = new NoMatcherError(props)

  t.is(actual.message, expectedMessage)
  t.is(actual.code, "SLATE_TO_REACT_NO_MATCHER_ERROR")
})
