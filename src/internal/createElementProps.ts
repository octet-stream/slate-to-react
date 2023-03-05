import type {RenderElementProps} from "slate-react"
import type {Element} from "slate"

import type {SwapObjectProps} from "./type/SwapObjectProps.js"
import type {CreateNodePropsResult} from "./createNodeProps.js"
import {createNodeProps} from "./createNodeProps.js"

type CreateElementPropsResult = SwapObjectProps<
  RenderElementProps,
  CreateNodePropsResult<RenderElementProps["attributes"]>
>

interface CreateElementPropsOptions {
  inline?: boolean
  void?: boolean
}

export function createElementProps(
  node: Element,
  options: CreateElementPropsOptions = {}
): CreateElementPropsResult {
  const {key, attributes} = createNodeProps()

  const props: CreateElementPropsResult = {
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
