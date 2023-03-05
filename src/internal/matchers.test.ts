import type {Text} from "slate"

import test from "ava"

import type {RichText} from "./type/RichText.js"

import {createLeafProps} from "./createLeafProps.js"
import {isRichText, isPlainText} from "./matchers.js"

test("isRichText matches rich text", t => {
  const node: RichText = {
    text: "Some bold text",
    bold: true
  }

  t.true(isRichText(createLeafProps(node)))
})

test("isRichText does not match plain text", t => {
  const node: Text = {
    text: "Some bold text"
  }

  t.false(isRichText(createLeafProps(node)))
})

test("isPlainText matches plain text", t => {
  const node: Text = {
    text: "Some bold text"
  }

  t.true(isPlainText(createLeafProps(node)))
})

test("isPlainText does not match rich text", t => {
  const node: RichText = {
    text: "Some bold text",
    bold: true
  }

  t.false(isPlainText(createLeafProps(node)))
})
