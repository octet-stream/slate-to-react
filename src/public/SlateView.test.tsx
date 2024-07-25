import test from "ava"

import {withRender} from "../__macro__/withRender.js"

import {ELEMENT_PARAGRAPH} from "../internal/constants.js"

import {SlateView} from "./SlateView.js"

test("Renders root element as <p>", withRender, async (t, render) => {
  const {container} = render(
    <SlateView
      nodes={[
        {
          type: ELEMENT_PARAGRAPH,
          children: [
            {
              text: "Hello, world!"
            }
          ]
        }
      ]}
    />
  )

  t.true(container.firstChild instanceof HTMLParagraphElement)
})
