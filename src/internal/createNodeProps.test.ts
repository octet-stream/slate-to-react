import test from "ava"

import type {Text} from "slate"
import type {TypeOf} from "ts-expect"

import {expectType} from "ts-expect"
import {createElement} from "react"

import {ELEMENT_PARAGRAPH} from "./constants.js"
import {createLeafProps, createElementProps} from "./createNodeProps.js"

import type {LeafProps, ElementProps} from "./createNodeProps.js"
import type {Blockquote} from "./type/Blockquote.js"
import type {Paragraph} from "./type/Paragraph.js"
import type {RichText} from "./type/RichText.js"
import type {Heading} from "./type/Heading.js"
import type {Link} from "./type/Link.js"

test("Creates valid props for leaf node", t => {
  const node: Text = {
    text: "Some text"
  }

  const actual = createLeafProps(node)

  t.is(actual.text, node)
  t.is(actual.leaf, node)
  t.is(typeof actual.children, "string")
  t.true(actual.attributes["data-slate-leaf"])
  t.is(typeof actual.attributes.key, "string")
})

test("Creates valid props for Element node", t => {
  const actual = createElementProps(
    {
      type: ELEMENT_PARAGRAPH,
      children: [{
        text: "Some text"
      }]
    },

    createElement("span", undefined, "Some text")
  )

  t.is(actual.attributes["data-slate-node"], "element")
  t.is(typeof actual.attributes.key, "string")
})

test("Creates data-slate-inline attribute for inline Element node", t => {
  const actual = createElementProps(
    {
      type: ELEMENT_PARAGRAPH,
      children: [{
        text: "Some text"
      }]
    },

    createElement("span", undefined, "Some text"),

    {
      inline: true
    }
  )

  t.true(actual.attributes["data-slate-inline"])
})

test("Creates data-slate-void attribute for inline Element node", t => {
  const actual = createElementProps(
    {
      type: ELEMENT_PARAGRAPH,
      children: [{
        text: "Some text"
      }]
    },

    createElement("span", undefined, "Some text"),

    {
      void: true
    }
  )

  t.true(actual.attributes["data-slate-void"])
})

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
