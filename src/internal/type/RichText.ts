import type {Text} from "slate"

export interface Superscript {
  superscript?: boolean
}

export interface Subscript {
  subscript?: boolean
}

export interface RichTextBase extends Text {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export type SubscriptRichText = RichTextBase & Subscript

export type SuperscriptRichText = RichTextBase & Superscript

export type RichText = SubscriptRichText | SuperscriptRichText
