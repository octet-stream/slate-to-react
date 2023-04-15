import test from "ava"

import {expectType} from "ts-expect"

import type {TypeOf} from "ts-expect"
import type {Element} from "slate"

import type {Node} from "./Node.js"

test("Node type is assignable to Element type", t => {
  expectType<TypeOf<Element, Node>>(true)

  t.pass()
})
