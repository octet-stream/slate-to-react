import test from "ava"

import {NoIdFieldError} from "./NoIdFieldError.js"

test("Has valid properties", t => {
  const actual = new NoIdFieldError()

  t.is(actual.message, "Node must have an ID field.")
  t.is(actual.code, "SLATE_TO_REACT_NO_ID_FIELD_ERROR")
})
