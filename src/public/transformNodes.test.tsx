import test from "ava"

import {withRender} from "../__macro__/withRender.js"

import {
  ELEMENT_PARAGRAPH,
  ELEMENT_LINK,
  HEADINGS_LIST,
  ELEMENT_BLOCKQUOTE
} from "../internal/constants.js"

import type {Blockquote} from "../internal/type/Blockquote.js"
import type {Paragraph} from "../internal/type/Paragraph.js"
import type {RichText} from "../internal/type/RichText.js"
import type {Heading} from "../internal/type/Heading.js"

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

test("Renders link element", withRender, async (t, render) => {
  const expectedUrl = "https://example.com/"
  const expectedText = "Example URL"

  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [{
      type: ELEMENT_LINK,
      url: expectedUrl,
      children: [{
        text: expectedText
      }]
    }]
  }]

  const {container} = render(transformNodes(nodes))

  const actual = container.querySelector(ELEMENT_LINK)

  t.true(actual instanceof HTMLAnchorElement)
  t.is(actual.textContent, expectedText)
  t.is(actual.href, expectedUrl)
})

test("Renders <blockquote> element", withRender, (t, render) => {
  const expectedQuote = "On Soviet Moon landscape see binoculars through YOU"

  const nodes: Blockquote[] = [{
    type: ELEMENT_BLOCKQUOTE,
    children: [{
      text: expectedQuote
    }]
  }]

  const {container} = render(transformNodes(nodes))

  const actual = container.querySelector(ELEMENT_BLOCKQUOTE)

  t.true(actual instanceof HTMLQuoteElement)
  t.is(actual.textContent, expectedQuote)
})

test("Renders headings", withRender, (t, render) => {
  const nodes = HEADINGS_LIST.map(heading => ({
    type: heading,
    children: [{
      text: `Heading H${heading}`
    }]
  }) as Heading<typeof heading>)

  const {container} = render(transformNodes(nodes))

  const headings = HEADINGS_LIST.map(heading => ({
    type: heading,
    element: container.querySelector(heading)
  }))

  t.true(headings.every(({element}) => element instanceof HTMLHeadingElement))

  t.true(headings.every(({type, element}) => (
    element.nodeName.toLowerCase() === type
  )))

  t.true(headings.every(({type, element}) => (
    element.textContent === `Heading H${type}`
  )))
})

test("Throws an error for invalid root node type", t => {
  const nodes: RichText[] = [{
    text: "This is invalid root node"
  }]

  // @ts-expect-error Expected to fail when called with invalid root nodes
  const trap = () => transformNodes(nodes)

  t.throws(trap, {
    instanceOf: TypeError,
    message: "Root element must be of Element type"
  })
})
