import test from "ava"

import type {TypeOf} from "ts-expect"
import {expectType} from "ts-expect"

import type {Node} from "../../public/Node.js"

import {Blockquote} from "./Blockquote.js"

test("Blockquote type is assignable to Node type", t => {
  expectType<TypeOf<Node, Blockquote>>(true)

  t.pass()
})
