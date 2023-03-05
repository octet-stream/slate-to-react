import test from "ava"

import {validate} from "uuid"

import {createNodeProps} from "./createNodeProps.js"

test("Creates valid base props", t => {
  const props = createNodeProps()

  t.true(validate(props.attributes.key))
})
