import type {RenderElementProps, RenderLeafProps} from "slate-react"
import type {ReactNode} from "react"
import type {Text} from "slate"

import type {SwapObjectProps} from "./type/SwapObjectProps.js"

import {Node} from "../public/Node.js"

interface PropsWithKey {
  key: string
}

interface LeafWithChildren {
  children: string
}

interface ElementWithChildren {
  children: ReactNode
}

export type LeafBaseProps = SwapObjectProps<RenderLeafProps, LeafWithChildren>

export type ElementBaseProps =
  SwapObjectProps<RenderElementProps, ElementWithChildren>

export type ElementProps<T extends Node = Node> =
  SwapObjectProps<ElementBaseProps, {
    element: SwapObjectProps<T, ElementWithChildren>
  }>

export type LeafProps<T extends Text = Text> =
  SwapObjectProps<LeafBaseProps, LeafWithChildren & {
    leaf: T
    text: T
  }>

export type NodeBaseProps = LeafProps | ElementProps

export type NodeProps<T extends NodeBaseProps> =
  SwapObjectProps<T, {
    attributes: T["attributes"] & PropsWithKey
  }>

function createNodeProps<
  TProps extends NodeBaseProps
>(props: TProps): NodeProps<TProps> {
  const key = crypto.randomUUID()

  return {
    ...props,

    attributes: {
      ...props.attributes,

      key
    }
  }
}

export const createLeafProps = <T extends Text = Text>(
  node: T
) => createNodeProps({
  leaf: node,
  text: node,
  children: node.text,
  attributes: {
    "data-slate-leaf": true
  }
})

export interface CreateElementPropsOptions {
  inline?: boolean
  void?: boolean
}

export function createElementProps<T extends Node = Node>(
  node: SwapObjectProps<T, ElementWithChildren>,
  options: CreateElementPropsOptions = {}
) {
  const props = createNodeProps<ElementProps<T>>({
    element: node,
    children: node.children,
    attributes: {
      "data-slate-node": "element",
      ref: null
    }
  })

  if (options.inline) {
    props.attributes["data-slate-inline"] = true
  }

  if (options.void) {
    props.attributes["data-slate-void"] = true
  }

  return props
}
