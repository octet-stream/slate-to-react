import type {TextNode} from "./TextNode.js"

export interface Superscript {
  superscript?: boolean
}

export interface Subscript {
  subscript?: boolean
}

export interface RichTextBase extends TextNode {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export type SubscriptRichText = RichTextBase & Subscript

export type SuperscriptRichText = RichTextBase & Superscript

export type RichText = SubscriptRichText | SuperscriptRichText
