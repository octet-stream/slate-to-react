/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import type {ReactNode, ReactElement} from "react"
import {Text, Element} from "slate"

import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_LINK,
  ELEMENT_PARAGRAPH,
  ELEMENT_BLOCKQUOTE
} from "./constants"

export interface ElementNode<T extends string = string> extends Element {
  type: T
  children: Node[]
}

export type Alignemnt = "left" | "right" | "center" | "justify"

interface WithAlignment {
  align: Alignemnt
}

export type Node = Text | ElementNode

export interface RichText extends Text {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  superscript?: boolean
  subscript?: boolean
  code?: boolean
}

export type Paragraph = ElementNode<typeof ELEMENT_PARAGRAPH> & WithAlignment

export type Headings =
  | typeof ELEMENT_H1
  | typeof ELEMENT_H2
  | typeof ELEMENT_H3
  | typeof ELEMENT_H4
  | typeof ELEMENT_H5
  | typeof ELEMENT_H6

export type Heading<T extends Headings> = ElementNode<T> & WithAlignment

export type Blockquote = ElementNode<typeof ELEMENT_BLOCKQUOTE>

export interface Link {
  type: typeof ELEMENT_LINK
  url: string
  children: Array<Text | RichText>
}

export type GetNodeType<N extends Node> =
  N extends Text
    ? "text"
    : N extends ElementNode
      ? N["type"]
      : never

interface Context<N extends Node> {
  type: GetNodeType<N>
  key: string
  node: N
  children: GetNodeType<N> extends "text" ? string : ReactNode
}

export interface NodeTransform<N extends Node = ElementNode> {
  (ctx: Context<N>): ReactElement<any, any>
}

export type Transform<N extends Node = ElementNode> = [
  type: GetNodeType<N>,
  transform: NodeTransform<N>
]
