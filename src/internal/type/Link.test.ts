import test from "ava"

import type {TypeOf} from "ts-expect"
import {expectType} from "ts-expect"

import type {Node} from "../../public/Node.js"

import type {Link} from "./Link.js"

test("Link type is assignable to Node type", t => {
  expectType<TypeOf<Node, Link>>(true)

  t.pass()
})
