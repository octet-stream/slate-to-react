import test from "ava"

import type {Link} from "../internal/type/Link.js"
import type {RichText} from "../internal/type/RichText.js"
import type {Paragraph} from "../internal/type/Paragraph.js"
import type {Blockquote} from "../internal/type/Blockquote.js"
import type {Heading, Headings} from "../internal/type/Heading.js"

import {
  createLeafProps,
  createElementProps
} from "../internal/createNodeProps.js"
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  HEADINGS_LIST
} from "../internal/constants.js"

import {
  isText,
  isParagraph,
  isBlockquote,
  isHeading,
  isLink,

  isH1,
  isH2,
  isH3,
  isH4,
  isH5,
  isH6
} from "./matchers.js"

const omitHeading = <T extends Headings>(type: T) => (
  HEADINGS_LIST.filter((h): h is Exclude<Headings, T> => h !== type)
)

test("isText matches any Text node", t => {
  const node: RichText = {
    text: "Some text",
    bold: true
  }

  t.true(isText(createLeafProps(node)))
})

test("isParagraph matches paragraph node", t => {
  const node: Paragraph = {
    type: "p",
    children: [{
      text: "Some text"
    }]
  }

  const actual = isParagraph(createElementProps(node as any))

  t.true(actual)
})

test("isLink matches link node", t => {
  const node: Link = {
    type: "a",
    url: "https://localhost:3000",
    children: [{
      text: "Example URL"
    }]
  }

  const actual = isLink(createElementProps(node as any))

  t.true(actual)
})

test("isBlockquote matches blockquote node", t => {
  const node: Blockquote = {
    type: "blockquote",
    children: [{
      text: "Some blockquote"
    }]
  }

  const actual = isBlockquote(createElementProps(node as any))

  t.true(actual)
})

test("isHeading matches any heading", t => {
  t.plan(HEADINGS_LIST.length)

  HEADINGS_LIST
    .map(heading => ({
      type: heading,
      children: [{
        text: `Heading H${heading}`
      }]
    }) as Heading<typeof heading>)
    .forEach(node => t.true(isHeading(createElementProps(node as any))))
})

test("isH1 matches H1 heading node", t => {
  const node: Heading<typeof ELEMENT_H1> = {
    type: ELEMENT_H1,
    children: [{
      text: "Heading H1"
    }]
  }

  t.true(isH1(createElementProps(node as any)))
})

test("isH1 does not match other headings", t => {
  const headings = omitHeading(ELEMENT_H1)

  const nodes = headings.map(heading => ({
    type: heading,
    children: [{
      text: `Heading ${heading}`
    }]
  }) as Heading<typeof heading>)

  // @ts-expect-error
  t.false(nodes.every(node => isH1(createElementProps(node))))
})

test("isH2 matches H2 heading node", t => {
  const node: Heading<typeof ELEMENT_H2> = {
    type: ELEMENT_H2,
    children: [{
      text: "Heading H2"
    }]
  }

  t.true(isH2(createElementProps(node as any)))
})

test("isH2 does not match other headings", t => {
  const headings = omitHeading(ELEMENT_H2)

  const nodes = headings.map(heading => ({
    type: heading,
    children: [{
      text: `Heading ${heading}`
    }]
  }) as Heading<typeof heading>)

  // @ts-expect-error
  t.false(nodes.every(node => isH2(createElementProps(node))))
})

test("isH3 matches H3 heading node", t => {
  const node: Heading<typeof ELEMENT_H3> = {
    type: ELEMENT_H3,
    children: [{
      text: "Heading H3"
    }]
  }

  t.true(isH3(createElementProps(node as any)))
})

test("isH3 does not match other headings", t => {
  const headings = omitHeading(ELEMENT_H3)

  const nodes = headings.map(heading => ({
    type: heading,
    children: [{
      text: `Heading ${heading}`
    }]
  }) as Heading<typeof heading>)

  // @ts-expect-error
  t.false(nodes.every(node => isH3(createElementProps(node))))
})

test("isH4 matches H4 heading node", t => {
  const node: Heading<typeof ELEMENT_H4> = {
    type: ELEMENT_H4,
    children: [{
      text: "Heading H4"
    }]
  }

  t.true(isH4(createElementProps(node as any)))
})

test("isH4 does not match other headings", t => {
  const headings = omitHeading(ELEMENT_H4)

  const nodes = headings.map(heading => ({
    type: heading,
    children: [{
      text: `Heading ${heading}`
    }]
  }) as Heading<typeof heading>)

  // @ts-expect-error
  t.false(nodes.every(node => isH4(createElementProps(node))))
})

test("isH5 matches H5 heading node", t => {
  const node: Heading<typeof ELEMENT_H5> = {
    type: ELEMENT_H5,
    children: [{
      text: "Heading H5"
    }]
  }

  t.true(isH5(createElementProps(node as any)))
})

test("isH5 does not match other headings", t => {
  const headings = omitHeading(ELEMENT_H5)

  const nodes = headings.map(heading => ({
    type: heading,
    children: [{
      text: `Heading ${heading}`
    }]
  }) as Heading<typeof heading>)

  // @ts-expect-error
  t.false(nodes.every(node => isH5(createElementProps(node))))
})

test("isH6 matches H6 heading node", t => {
  const node: Heading<typeof ELEMENT_H6> = {
    type: ELEMENT_H6,
    children: [{
      text: "Heading H6"
    }]
  }

  t.true(isH6(createElementProps(node as any)))
})

test("isH6 does not match other headings", t => {
  const headings = omitHeading(ELEMENT_H6)

  const nodes = headings.map(heading => ({
    type: heading,
    children: [{
      text: `Heading ${heading}`
    }]
  }) as Heading<typeof heading>)

  // @ts-expect-error
  t.false(nodes.every(node => isH6(createElementProps(node))))
})
