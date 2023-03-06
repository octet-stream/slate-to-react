import test from "ava"

import type {Text} from "slate"

import {validate} from "uuid"

import type {Paragraph} from "./type/Paragraph.js"

import {ELEMENT_PARAGRAPH} from "./constants.js"
import {createLeafProps, createElementProps} from "./createNodeProps.js"

test("Creates valid props for leaf node", t => {
  const node: Text = {
    text: "Some text"
  }

  const actual = createLeafProps(node)

  t.is(actual.text, node)
  t.is(actual.leaf, node)
  t.is(typeof actual.children, "string")
  t.true(actual.attributes["data-slate-leaf"])
  t.true(validate(actual.attributes.key))
})

test("Creates valid props for Element node", t => {
  const node: Paragraph = {
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Some text"
    }]
  }

  const actual = createElementProps(node as any)

  t.is(actual.element, node as any)
  t.is(actual.attributes["data-slate-node"], "element")
  t.true(validate(actual.attributes.key))
})

test("Creates data-slate-inline attribute for inline Element node", t => {
  const node: Paragraph = {
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Some text"
    }]
  }

  const actual = createElementProps(node as any, {inline: true})

  t.true(actual.attributes["data-slate-inline"])
})

test("Creates data-slate-void attribute for inline Element node", t => {
  const node: Paragraph = {
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Some text"
    }]
  }

  const actual = createElementProps(node as any, {void: true})

  t.true(actual.attributes["data-slate-void"])
})
