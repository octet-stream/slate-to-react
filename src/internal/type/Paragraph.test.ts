import test from "ava"

import type {TypeOf} from "ts-expect"
import {expectType} from "ts-expect"

import type {Node} from "../../public/Node.js"

import type {Paragraph} from "./Paragraph.js"

test("Paragraph type is assignable to Node type", t => {
  expectType<TypeOf<Node, Paragraph>>(true)

  t.pass()
})
