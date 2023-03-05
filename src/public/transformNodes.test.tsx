import test from "ava"

import {withRender} from "../__macro__/withRender.js"

import {ELEMENT_PARAGRAPH} from "../internal/constants.js"

import type {Paragraph} from "../internal/type/Paragraph.js"

import {transformNodes} from "./transformNodes.js"

test("Renders a simple paragraph node", withRender, async (t, render) => {
  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Some text"
    }]
  }]

  const {findByText} = render(transformNodes(nodes))

  const actual = await findByText("Some text")

  t.true(actual instanceof HTMLSpanElement)
  t.true(actual.parentElement instanceof HTMLParagraphElement)
})
