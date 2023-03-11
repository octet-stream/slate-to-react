import test from "ava"

import type {TypeOf} from "ts-expect"

import {expectType} from "ts-expect"
import {createElement} from "react"

import {isNanoId} from "../__helper__/isNanoId.js"

import type {Node} from "../public/Node.js"

import {ELEMENT_PARAGRAPH} from "./constants.js"
import {createLeafProps, createElementProps} from "./createNodeProps.js"

import type {LeafProps, ElementProps} from "./createNodeProps.js"
import type {Blockquote} from "./type/Blockquote.js"
import type {Paragraph} from "./type/Paragraph.js"
import type {TextNode} from "./type/TextNode.js"
import type {RichText} from "./type/RichText.js"
import type {Heading} from "./type/Heading.js"
import type {Link} from "./type/Link.js"

test("createLeafProps creates valid props for leaf node", t => {
  const node: TextNode = {
    text: "Some text"
  }

  const actual = createLeafProps(node)

  t.is(actual.text, node)
  t.is(actual.leaf, node)
  t.is(typeof actual.children, "string")
  t.true(actual.attributes["data-slate-leaf"])
  t.is(typeof actual.attributes.key, "string")
})

test("createElementProps creates valid props for Element node", t => {
  const node: Node = {
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Some text"
    }]
  }

  const actual = createElementProps(
    node,

    createElement("span", undefined, "Some text")
  )

  t.is(actual.attributes["data-slate-node"], "element")
  t.is(typeof actual.attributes.key, "string")
})

test("createLeafProps TextNode's own id field has higher priority", t => {
  const expected = "some_id"
  const node: TextNode = {
    id: expected,
    text: "Some text"
  }

  const actual = createLeafProps(node)

  t.is(actual.attributes.key, expected)
})

test("createElementProps Node's own id field has higher priority", t => {
  const expected = "some_id"
  const node: Paragraph = {
    id: expected,
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Some text"
    }]
  }

  const actual = createElementProps(
    node,

    createElement(node.type, undefined, "Some text")
  )

  t.is(actual.attributes.key, expected)
})

test(
  "createLeafProps always generates id when forceGenerateId option is set",
  t => {
    const inputId = "some_id"
    const node: TextNode = {
      id: inputId,
      text: "Some text"
    }

    const actual = createLeafProps(node, {forceGenerateId: true})

    t.not(actual.attributes.key, inputId)
    t.true(isNanoId(actual.attributes.key))
  }
)

test(
  "createElementProps always generates id when forceGenerateId option is set",
  t => {
    const inputId = "some_id"
    const node: Paragraph = {
      id: inputId,
      type: ELEMENT_PARAGRAPH,
      children: [{
        text: "Some text"
      }]
    }

    const actual = createElementProps(
      node,

      createElement("span", undefined, "Some text"),

      {
        forceGenerateId: true
      }
    )

    t.not(actual.attributes.key, inputId)
    t.true(isNanoId(actual.attributes.key))
  }
)

test(
  "LeafProps with specific type parameters is assignable "
    + "to default parameter",

  t => {
    expectType<TypeOf<LeafProps, LeafProps<RichText>>>(true)

    t.pass()
  }
)

test(
  "ElementProps with specific type parameters is assignable "
    + "to default parameter",
  t => {
    type Actual =
      | ElementProps<Link>
      | ElementProps<Paragraph>
      | ElementProps<Blockquote>
      | ElementProps<Heading>

    expectType<TypeOf<ElementProps, Actual>>(true)

    t.pass()
  }
)
