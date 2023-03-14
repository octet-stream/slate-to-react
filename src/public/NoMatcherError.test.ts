import test from "ava"

import type {Blockquote} from "../internal/type/Blockquote.js"

import {ELEMENT_BLOCKQUOTE} from "../internal/constants.js"
import {getNodeType} from "../internal/getNodeType.js"

import {NoMatcherError} from "./NoMatcherError.js"

test("Creates NoMatcherError instance for given node props", t => {
  const text = "I beat Twilight Sparkle and all I got was this lousy t-shirt."

  const node: Blockquote = {
    type: ELEMENT_BLOCKQUOTE,
    children: [{
      text
    }]
  }

  const expectedMessage = `Cannot find transform for node ${getNodeType(node)}`

  const actual = new NoMatcherError(node)

  t.is(actual.message, expectedMessage)
  t.is(actual.code, "SLATE_TO_REACT_NO_MATCHER_ERROR")
})
