import type {Element} from "slate"
import {validate} from "uuid"

import test from "ava"

import type {Paragraph} from "./type/Paragraph.js"

import {ELEMENT_PARAGRAPH} from "./constants.js"
import {createElementProps} from "./createElementProps.js"

test("Creates valid props for Element node", t => {
  const node: Paragraph = {
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Some text"
    }]
  }

  const actual = createElementProps(node)

  t.is(actual.element, node)
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

  const actual = createElementProps(node, {inline: true})

  t.true(actual.attributes["data-slate-inline"])
})

test("Creates data-slate-void attribute for inline Element node", t => {
  const node: Paragraph = {
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Some text"
    }]
  }

  const actual = createElementProps(node, {void: true})

  t.true(actual.attributes["data-slate-void"])
})
