import type {Text} from "slate"

import test from "ava"

import type {RichText} from "./type/RichText.js"
import type {EmptyText} from "./type/EmptyText.js"

import {isRichText, isPlainText, isEmptyText} from "./matchers.js"

test("isRichText matches RichText node", t => {
  const node: RichText = {
    text: "Some bold text",
    bold: true
  }

  t.true(isRichText(node))
})

test("isRichText does not match Text node", t => {
  const node: Text = {
    text: "Some bold text"
  }

  t.false(isRichText(node))
})

test("isRichtext does not match empty RichText node", t => {
  const node: RichText = {
    text: "",
    strikethrough: true
  }

  t.false(isRichText(node))
})

test("isPlainText matches Text node", t => {
  const node: Text = {
    text: "Some bold text"
  }

  t.true(isPlainText(node))
})

test("isPlainText does not match RichText node", t => {
  const node: RichText = {
    text: "Some bold text",
    bold: true
  }

  t.false(isPlainText(node))
})

test("isPlainText does not match empty Text node", t => {
  const node: Text = {
    text: ""
  }

  t.false(isPlainText(node))
})

test("isEmptyText matches empty text node", t => {
  const node: EmptyText = {
    text: ""
  }

  t.true(isEmptyText(node))
})

test("isEmptyText matches empty RichText node", t => {
  const node: RichText = {
    text: "",
    bold: true
  }

  // @ts-expect-error
  t.true(isEmptyText(node))
})

test("isEmptyText does not match non-empty text node", t => {
  const node: Text = {
    text: "Some text"
  }

  // @ts-expect-error
  t.false(isEmptyText(node))
})

test("isEmptyText does not match RichText node", t => {
  const node: RichText = {
    text: "Some italic text",
    italic: true
  }

  // @ts-expect-error
  t.false(isEmptyText(node))
})
