import type {RenderElementProps} from "slate-react"

import type {SwapObjectProps} from "./type/SwapObjectProps.js"
import type {NodeProps} from "./createNodeProps.js"

import {createNodeProps} from "./createNodeProps.js"

import type {Node} from "../public/Node.js"

export type ElementProps<T extends Node = Node> = SwapObjectProps<
  RenderElementProps,
  NodeProps<RenderElementProps["attributes"]> & {
    element: T
  }
>

interface CreateElementPropsOptions {
  inline?: boolean
  void?: boolean
}

export function createElementProps<T extends Node = Node>(
  node: T,
  options: CreateElementPropsOptions = {}
): ElementProps<T> {
  const {key, attributes} = createNodeProps()

  const props: ElementProps<T> = {
    key,
    element: node,
    children: node.children,
    attributes: {
      ...attributes,
      ref: null,
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
