import type {Text} from "slate"
import {validate} from "uuid"

import test from "ava"

import {createLeafProps} from "./createLeafProps.js"

test("Creates valid props for leaf node", t => {
  const node: Text = {
    text: "Some text"
  }

  const actual = createLeafProps(node)

  t.is(actual.text, node)
  t.is(actual.leaf, node)
  t.is(typeof actual.children, "string")
  t.true(actual.attributes["data-slate-leaf"])
  t.true(validate(actual.attributes.key))
})
