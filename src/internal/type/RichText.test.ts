import test from "ava"

import type {Text} from "slate"
import type {TypeOf} from "ts-expect"

import {expectType} from "ts-expect"

import {RichText} from "./RichText.js"

test("RichText type is assignable to Slate's Text type", t => {
  expectType<TypeOf<Text, RichText>>(true)

  t.pass()
})
