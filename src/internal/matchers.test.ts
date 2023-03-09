import type {Text} from "slate"

import test from "ava"

import type {RichText} from "./type/RichText.js"

import {isRichText, isPlainText} from "./matchers.js"

test("isRichText matches rich text", t => {
  const node: RichText = {
    text: "Some bold text",
    bold: true
  }

  t.true(isRichText(node))
})

test("isRichText does not match plain text", t => {
  const node: Text = {
    text: "Some bold text"
  }

  t.false(isRichText(node))
})

test("isPlainText matches plain text", t => {
  const node: Text = {
    text: "Some bold text"
  }

  t.true(isPlainText(node))
})

test("isPlainText does not match rich text", t => {
  const node: RichText = {
    text: "Some bold text",
    bold: true
  }

  t.false(isPlainText(node))
})
