import test from "ava"

import {expectType} from "ts-expect"

import type {TypeOf} from "ts-expect"
import type {Text} from "slate"

import type {TextNode} from "./TextNode.js"

test("TextNode type is assignable to Text type", t => {
  expectType<TypeOf<Text, TextNode>>(true)

  t.pass()
})

test("Text type is assignable to TextNode type", t => {
  expectType<TypeOf<TextNode, Text>>(true)

  t.pass()
})
