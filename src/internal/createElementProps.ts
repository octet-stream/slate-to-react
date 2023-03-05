import type {RenderElementProps} from "slate-react"

import type {SwapObjectProps} from "./type/SwapObjectProps.js"
import type {CreateNodePropsResult} from "./createNodeProps.js"

import {createNodeProps} from "./createNodeProps.js"

import type {Node} from "../public/Node.js"

export type ElementProps = SwapObjectProps<
  RenderElementProps,
  CreateNodePropsResult<RenderElementProps["attributes"]> & {
    element: Node
  }
>

interface CreateElementPropsOptions {
  inline?: boolean
  void?: boolean
}

export function createElementProps(
  node: Node,
  options: CreateElementPropsOptions = {}
): ElementProps {
  const {key, attributes} = createNodeProps()

  const props: ElementProps = {
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
