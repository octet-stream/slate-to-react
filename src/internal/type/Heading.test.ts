import test from "ava"

import type {TypeOf} from "ts-expect"
import {expectType} from "ts-expect"

import type {Node} from "../../public/Node.js"

import type {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6
} from "../constants.js"

import type {Heading} from "./Heading.js"

test("Heading type is assignable to Node type", t => {
  expectType<TypeOf<Node, Heading>>(true)

  t.pass()
})

test('Heading<"h1"> type is assignable to Node type', t => {
  expectType<TypeOf<Node, Heading<typeof ELEMENT_H1>>>(true)

  t.pass()
})

test('Heading<"h2"> type is assignable to Node type', t => {
  expectType<TypeOf<Node, Heading<typeof ELEMENT_H2>>>(true)

  t.pass()
})

test('Heading<"h3"> type is assignable to Node type', t => {
  expectType<TypeOf<Node, Heading<typeof ELEMENT_H3>>>(true)

  t.pass()
})

test('Heading<"h4"> type is assignable to Node type', t => {
  expectType<TypeOf<Node, Heading<typeof ELEMENT_H4>>>(true)

  t.pass()
})

test('Heading<"h5"> type is assignable to Node type', t => {
  expectType<TypeOf<Node, Heading<typeof ELEMENT_H5>>>(true)

  t.pass()
})

test('Heading<"h6"> type is assignable to Node type', t => {
  expectType<TypeOf<Node, Heading<typeof ELEMENT_H6>>>(true)

  t.pass()
})
