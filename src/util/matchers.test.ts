import test from "ava"

import type {RichText, Paragraph, Blockquote, Link} from "../types.js"

import {
  isText,
  isParagraph,
  isBlockquote,
  isLink
} from "./matchers.js"

test("isText matches any Text node", t => {
  const node: RichText = {
    text: "Some text",
    bold: true
  }

  const actual = isText({
    key: "123",
    text: node,
    leaf: node,
    children: "Some text",
    attributes: {
      "data-slate-leaf": true
    }
  })

  t.true(actual)
})

test("isParagraph matches paragraph node", t => {
  const node: Paragraph = {
    type: "p",
    children: [{
      text: "Some text"
    }]
  }

  const actual = isParagraph({
    key: "123",
    element: node,
    children: ["Some text"],
    attributes: {
      "data-slate-node": "element",
      ref: null
    }
  })

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

  const actual = isLink({
    key: "123",
    element: node,
    children: ["Some text"],
    attributes: {
      "data-slate-node": "element",
      ref: null
    }
  })

  t.true(actual)
})

test("isBlockquote matches blockquote node", t => {
  const node: Blockquote = {
    type: "blockquote",
    children: [{
      text: "Some blockquote"
    }]
  }

  const actual = isBlockquote({
    key: "123",
    element: node,
    children: ["Some blockquote"],
    attributes: {
      "data-slate-node": "element",
      ref: null
    }
  })

  t.true(actual)
})
