import test from "ava"

import {validate} from "uuid"

import {createNodeProps} from "./createNodeProps.js"

test("Creates valid base props for leaf", t => {
  const props = createNodeProps({
    "data-slate-leaf": true
  })

  t.true(props.attributes["data-slate-leaf"])
  t.true(validate(props.attributes.key))
})

test("Creates valid base props for element", t => {
  const props = createNodeProps({
    "data-slate-node": "element",
    ref: null
  })

  t.is(props.attributes["data-slate-node"], "element")
  t.is(props.attributes.ref, null)
  t.true(validate(props.attributes.key))
})
