import React from "react"
import test from "ava"

import {withRender} from "./__macro__/withRender.js"

import {SlateView} from "./SlateView.js"
import {ELEMENT_PARAGRAPH, ELEMENT_LINK} from "./internal/constants.js"

test("Renders root element as <p>", withRender, async (t, render) => {
  const {container} = render(<SlateView
    nodes={[{
      type: ELEMENT_PARAGRAPH,
      children: [{
        text: "Hello, world!"
      }]
    }]}
  />)

  t.true(container.firstChild instanceof HTMLParagraphElement)
})

test("Renders text element as <span>", withRender, async (t, render) => {
  const {findByText} = render(<SlateView
    nodes={[{
      type: ELEMENT_PARAGRAPH,
      children: [{
        text: "Hello, world!"
      }]
    }]}
  />)

  const actual = await findByText("Hello, world!")

  t.true(actual instanceof HTMLSpanElement)
  t.true(actual.parentNode instanceof HTMLParagraphElement)
})

test("Renders link element as <a>", withRender, async (t, render) => {
  const expected = "https://github.com/octet-stream"

  const {container} = render(<SlateView
    nodes={[{
      type: ELEMENT_PARAGRAPH,
      children: [{
        type: ELEMENT_LINK,
        url: expected,
        children: [{
          text: "URL"
        }]
      }] as any[]
    }]}
  />)

  const link = container.querySelector("a")

  if (!link) {
    return t.fail("Link element must be present")
  }

  t.is(link.href, expected)
})
