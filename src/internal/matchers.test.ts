import type {Text} from "slate"

import test from "ava"

import type {RichText} from "./type/RichText.js"

import {isRichText, isPlainText} from "./matchers.js"

test("isRichText matches rich text", t => {
  const node: RichText = {
    text: "Some bold text",
    bold: true
  }

  const actual = isRichText({
    key: "123",
    children: "Some bold text",
    leaf: node,
    text: node,
    attributes: {
      "data-slate-leaf": true
    }
  })

  t.true(actual)
})

test("isRichText does not match plain text", t => {
  const node: Text = {
    text: "Some bold text"
  }

  const actual = isRichText({
    key: "123",
    children: "Some bold text",
    leaf: node,
    text: node,
    attributes: {
      "data-slate-leaf": true
    }
  })

  t.false(actual)
})

test("isPlainText matches plain text", t => {
  const node: Text = {
    text: "Some bold text"
  }

  const actual = isPlainText({
    key: "123",
    children: "Some bold text",
    leaf: node,
    text: node,
    attributes: {
      "data-slate-leaf": true
    }
  })

  t.true(actual)
})

test("isPlainText does not match rich text", t => {
  const node: RichText = {
    text: "Some bold text",
    bold: true
  }

  const actual = isPlainText({
    key: "123",
    children: "Some bold text",
    leaf: node,
    text: node,
    attributes: {
      "data-slate-leaf": true
    }
  })

  t.false(actual)
})
