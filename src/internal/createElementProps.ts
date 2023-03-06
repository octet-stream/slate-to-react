import type {RenderElementProps} from "slate-react"
import type {ReactNode} from "react"

import type {SwapObjectProps} from "./type/SwapObjectProps.js"
import type {NodeProps} from "./createNodeProps.js"

import type {ElementAttributes} from "./createNodeProps.js"
import {createNodeProps} from "./createNodeProps.js"

import type {Node} from "../public/Node.js"

interface ElementWithChildren {
  children: ReactNode
}

export type ElementProps<T extends Node = Node> = SwapObjectProps<
  RenderElementProps,
  NodeProps<ElementAttributes> & {
    element: SwapObjectProps<T, ElementWithChildren>
  }
>

interface CreateElementPropsOptions {
  inline?: boolean
  void?: boolean
}

export function createElementProps<T extends Node = Node>(
  node: SwapObjectProps<T, ElementWithChildren>,
  options: CreateElementPropsOptions = {}
): ElementProps<T> {
  const base = createNodeProps({
    ref: null,
    "data-slate-node": "element"
  })

  const props: ElementProps<T> = {
    ...base,

    element: node,
    children: node.children,
  }

  if (options.inline) {
    props.attributes["data-slate-inline"] = true
  }

  if (options.void) {
    props.attributes["data-slate-void"] = true
  }

  return props
}
