import test from "ava"

import type {ReactNode} from "react"

import {withRender} from "../__macro__/withRender.js"

import {
  ELEMENT_PARAGRAPH,
  ELEMENT_LINK,
  HEADINGS_LIST,
  ELEMENT_BLOCKQUOTE
} from "../internal/constants.js"
import {NoMatcherError} from "./NoMatcherError.js"
import {InvalidRootNodeTypeError} from "./InvalidRootNodeTypeError.js"
import {isRichText, isPlainText} from "../internal/matchers.js"

import type {Blockquote} from "../internal/type/Blockquote.js"
import type {Paragraph} from "../internal/type/Paragraph.js"
import type {RichText} from "../internal/type/RichText.js"
import type {Heading} from "../internal/type/Heading.js"

import {isLink, isParagraph} from "./matchers.js"
import {createElementTransform, createLeafTransform} from "./createTransform.js"

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

test("Renders empty text nodes as <br />", withRender, async (t, render) => {
  const expected = ["span", "br", "span"] as const
  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: "A"
      },
      {
        text: ""
      },
      {
        text: "B"
      }
    ]
  }]

  const {container} = render(transformNodes(nodes))

  t.true(expected.every(element => {
    const actual = container.querySelector(element)

    return actual && actual.tagName.toLowerCase() === element
  }))
})

test("Renders empty rich text nodes as <br />", withRender, async (t, render) => {
  const expected = ["span", "br", "span"] as const
  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: "A"
      },
      {
        text: "",
        bold: true
      },
      {
        text: "B"
      }
    ]
  }]

  const {container} = render(transformNodes(nodes))

  t.true(expected.every(element => {
    const actual = container.querySelector(element)

    return actual && actual.tagName.toLowerCase() === element
  }))
})

test("Renders bold rich text", withRender, async (t, render) => {
  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Bold text",
      bold: true
    }]
  }]

  const {container} = render(transformNodes(nodes))

  const actual = container.querySelector("strong")

  if (!actual) {
    return t.fail()
  }

  t.true(actual instanceof HTMLElement)
  t.is(actual.tagName.toLowerCase(), "strong")
})

test("Renders italic rich text", withRender, async (t, render) => {
  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Italic text",
      italic: true
    }]
  }]

  const {container} = render(transformNodes(nodes))

  const actual = container.querySelector("i")

  if (!actual) {
    return t.fail()
  }

  t.true(actual instanceof HTMLElement)
  t.is(actual.tagName.toLowerCase(), "i")
})

test("Renders underline rich text", withRender, async (t, render) => {
  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Underline text",
      underline: true
    }]
  }]

  const {container} = render(transformNodes(nodes))

  const actual = container.querySelector("u")

  if (!actual) {
    return t.fail()
  }

  t.true(actual instanceof HTMLElement)
  t.is(actual.tagName.toLowerCase(), "u")
})

test("Renders strikethrough rich text", withRender, async (t, render) => {
  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Strikethrough text",
      strikethrough: true
    }]
  }]

  const {container} = render(transformNodes(nodes))

  const actual = container.querySelector("s")

  if (!actual) {
    return t.fail()
  }

  t.true(actual instanceof HTMLElement)
  t.is(actual.tagName.toLowerCase(), "s")
})

test("Renders superscript rich text", withRender, async (t, render) => {
  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Superscript text",
      superscript: true
    }]
  }]

  const {container} = render(transformNodes(nodes))

  const actual = container.querySelector("sup")

  if (!actual) {
    return t.fail()
  }

  t.true(actual instanceof HTMLElement)
  t.is(actual.tagName.toLowerCase(), "sup")
})

test("Renders subscript rich text", withRender, async (t, render) => {
  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Subscript text",
      subscript: true
    }]
  }]

  const {container} = render(transformNodes(nodes))

  const actual = container.querySelector("sub")

  if (!actual) {
    return t.fail()
  }

  t.true(actual instanceof HTMLElement)
  t.is(actual.tagName.toLowerCase(), "sub")
})

test("Renders code rich text", withRender, async (t, render) => {
  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [{
      text: "Code text",
      code: true
    }]
  }]

  const {container} = render(transformNodes(nodes))

  const actual = container.querySelector("code")

  if (!actual) {
    return t.fail()
  }

  t.true(actual instanceof HTMLElement)
  t.is(actual.tagName.toLowerCase(), "code")
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

  if (!actual) {
    return t.fail()
  }

  t.true(actual instanceof HTMLAnchorElement)
  t.is(actual.textContent, expectedText)
  t.is(actual.href, expectedUrl)
})

test("Renders <blockquote> element", withRender, async (t, render) => {
  const expectedQuote = "On Soviet Moon landscape see binoculars through YOU"

  const nodes: Blockquote[] = [{
    type: ELEMENT_BLOCKQUOTE,
    children: [{
      text: expectedQuote
    }]
  }]

  const {container} = render(transformNodes(nodes))

  const actual = container.querySelector(ELEMENT_BLOCKQUOTE)

  if (!actual) {
    return t.fail()
  }

  t.true(actual instanceof HTMLQuoteElement)
  t.is(actual.textContent, expectedQuote)
})

test("Renders headings", withRender, async (t, render) => {
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

  t.true(headings.every(({type, element}) => (
    element instanceof HTMLHeadingElement
      && element.nodeName.toLowerCase() === type
      && element.textContent === `Heading H${type}`
  )))
})

test("Renders nodes with custom transform", withRender, async (t, render) => {
  const expectedDataLink = "This was rendered with custom link transform"
  const expectedDataText = "This was rendered with custom Text transform"
  const expectedDataRichText = (
    "This was rendered with custom rich text transform"
  )
  const expectedDataParagraph = (
    "This was rendered with custom paragraph transform"
  )

  const MyParagraph = createElementTransform(
    isParagraph,

    ({attributes, children}) => (
      <p {...attributes} id="paragraph" data-paragraph={expectedDataParagraph}>
        {children}
      </p>
    )
  )

  const MyLink = createElementTransform(
    isLink,

    ({element, attributes, children}) => (
      <a
        {...attributes}

        href={element.url}
        id="link"
        data-link={expectedDataLink}
      >
        {children}
      </a>
    )
  )

  const MyPlainText = createLeafTransform(
    isPlainText,

    ({attributes, children}) => (
      <span {...attributes} id="text" data-text={expectedDataText}>
        {children}
      </span>
    )
  )

  const MyRichText = createLeafTransform(
    isRichText,

    ({leaf, attributes, children}) => {
      let element: ReactNode = children

      if (leaf.bold) {
        element = <strong>{children}</strong>
      }

      return (
        <span
          {...attributes}

          id="rich-text"
          data-rich-text={expectedDataRichText}
        >
          {element}
        </span>
      )
    }
  )

  const nodes: Paragraph[] = [{
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        type: ELEMENT_LINK,
        url: "https://example.com/",
        children: [{
          text: "Example URL"
        }]
      },
      {
        text: "Bold text",
        bold: true
      }
    ]
  }]

  const {container} = render(transformNodes(nodes, {
    transforms: {
      elements: [MyParagraph, MyLink],
      leaves: [MyPlainText, MyRichText]
    }
  }))

  const actualParagraph = container.querySelector<HTMLParagraphElement>(
    "#paragraph"
  )

  if (!actualParagraph) {
    return t.fail()
  }

  t.true(actualParagraph instanceof HTMLParagraphElement)
  t.is(actualParagraph.dataset.paragraph, expectedDataParagraph)

  const actualLink = container.querySelector<HTMLAnchorElement>("#link")

  if (!actualLink) {
    return t.fail()
  }

  t.true(actualLink instanceof HTMLAnchorElement)
  t.is(actualLink.dataset.link, expectedDataLink)

  const actualText = container.querySelector<HTMLSpanElement>("#text")

  if (!actualText) {
    return t.fail()
  }

  t.true(actualText instanceof HTMLSpanElement)
  t.is(actualText.dataset.text, expectedDataText)

  const actualRichText = container.querySelector<HTMLSpanElement>("#rich-text")

  if (!actualRichText) {
    return t.fail()
  }

  t.true(actualRichText instanceof HTMLSpanElement)
  t.is(actualRichText.dataset.richText, expectedDataRichText)
})

test("Throws an error when rendering w/o transforms and defaults disabled", t => {
  const nodes: Paragraph[] = [{
    id: "1",
    type: ELEMENT_PARAGRAPH,
    children: [{
      id: "2",
      text: "Some text"
    }]
  }]

  const trap = () => transformNodes(nodes, {defaultTransforms: false})

  t.throws(trap, {
    instanceOf: NoMatcherError,
    message: "Cannot find transform for node Text"
  })
})

test("Throws an error for invalid root node type", t => {
  const nodes: RichText[] = [{
    text: "This is invalid root node"
  }]

  // @ts-expect-error Expected to fail when called with invalid root nodes
  const trap = () => transformNodes(nodes)

  t.throws(trap, {
    instanceOf: InvalidRootNodeTypeError,
    message: "Root elements must be of Node<T> type"
  })
})

test("Throws an error when no matches found for given node type", t => {
  const nodeType = "some-unknown-custom-tag"

  const trap = () => transformNodes([{
    type: "some-unknown-custom-tag",
    children: [{
      text: "This would fail"
    }]
  }])

  t.throws(trap, {
    instanceOf: NoMatcherError,
    message: `Cannot find transform for node Node<"${nodeType}">`
  })
})
