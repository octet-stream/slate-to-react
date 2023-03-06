import type {RenderElementProps, RenderLeafProps} from "slate-react"
import type {ReactNode} from "react"
import type {Text} from "slate"

import {nanoid} from "nanoid"

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

export type LeafBaseProps<T extends Text = Text> =
  SwapObjectProps<RenderLeafProps, LeafWithChildren & {
    leaf: T
    text: T
  }>

export type ElementBaseProps<T extends Node = Node> =
  SwapObjectProps<RenderElementProps, ElementWithChildren & {
    element: SwapObjectProps<T, ElementWithChildren>
  }>

export type ElementProps<T extends Node = Node> =
  SwapObjectProps<ElementBaseProps, {
    element: SwapObjectProps<T, ElementWithChildren>
    attributes: SwapObjectProps<ElementBaseProps["attributes"], PropsWithKey>
  }>

export type LeafProps<T extends Text = Text> =
  SwapObjectProps<LeafBaseProps, LeafWithChildren & {
    leaf: T
    text: T
    attributes: SwapObjectProps<LeafBaseProps["attributes"], PropsWithKey>
  }>

export type NodeBaseProps = LeafBaseProps | ElementBaseProps

export type NodeProps<T extends NodeBaseProps> =
  T extends LeafBaseProps<infer U>
    ? LeafProps<U>
    : T extends ElementBaseProps<infer U>
      ? ElementProps<U>
      : never

function createNodeProps<
  TProps extends NodeBaseProps
>(props: TProps): NodeProps<TProps> {
  const key = nanoid()

  return {
    ...props,

    attributes: {
      ...props.attributes,

      key
    }
  } as NodeProps<TProps>
}

export const createLeafProps = <T extends Text = Text>(
  node: T
) => createNodeProps(
    {
      leaf: node,
      text: node,
      children: node.text,
      attributes: {
        "data-slate-leaf": true
      }
    }
  )

export interface CreateElementPropsOptions {
  inline?: boolean
  void?: boolean
}

export function createElementProps<T extends Node = Node>(
  node: SwapObjectProps<T, ElementWithChildren>,
  options: CreateElementPropsOptions = {}
) {
  const props = createNodeProps({
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
