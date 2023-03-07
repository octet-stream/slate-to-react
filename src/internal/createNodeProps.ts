import type {RenderElementProps, RenderLeafProps} from "slate-react"
import type {ReactNode} from "react"
import type {Text} from "slate"

import {nanoid} from "nanoid"

import type {Node} from "../public/Node.js"
import type {Replace} from "../public/Replace.js"

import type {Descendant} from "./type/Descendant.js"

interface PropsWithKey {
  key: string
}

interface LeafWithChildren {
  children: string
}

interface ElementWithChildren {
  children: ReactNode
}

export type LeafBaseProps<T extends Text = Text> =
  Replace<RenderLeafProps, LeafWithChildren & {
    leaf: T
    text: T
  }>

export type ElementBaseProps<T extends Node = Node> =
  Replace<RenderElementProps, ElementWithChildren & {
    element: Replace<T, ElementWithChildren>
  }>

export type NodeBaseProps<T extends Descendant> = T extends Node
  ? ElementBaseProps<T>
  : T extends Text
    ? LeafBaseProps<T>
    : never

export type NodeProps<T extends Descendant> = Replace<NodeBaseProps<T>, {
  attributes: NodeBaseProps<T>["attributes"] & PropsWithKey
}>

export type ElementProps<T extends Node = Node> =
  Replace<ElementBaseProps<T>, {
    attributes: Replace<ElementBaseProps["attributes"], PropsWithKey>
  }>

export type LeafProps<T extends Text = Text> =
  Replace<LeafBaseProps<T>, LeafWithChildren & {
    attributes: Replace<LeafBaseProps["attributes"], PropsWithKey>
  }>

export const createLeafProps = <T extends Text = Text>(
  node: T
): LeafProps<T> => ({
    leaf: node,
    text: node,
    children: node.text,
    attributes: {
      key: nanoid(),
      "data-slate-leaf": true,
    }
  })

export interface CreateElementPropsOptions {
  inline?: boolean
  void?: boolean
}

export function createElementProps<T extends Node = Node>(
  node: Replace<T, ElementWithChildren>,
  options: CreateElementPropsOptions = {}
): ElementProps<T> {
  const props: ElementProps<T> = {
    element: node,
    children: node.children,
    attributes: {
      ref: null,
      key: nanoid(),
      "data-slate-node": "element",
    }
  }

  if (options.inline) {
    props.attributes["data-slate-inline"] = true
  }

  if (options.void) {
    props.attributes["data-slate-void"] = true
  }

  return props
}
