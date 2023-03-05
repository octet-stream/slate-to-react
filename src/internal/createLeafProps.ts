import type {RenderLeafProps} from "slate-react"
import type {Text} from "slate"

import type {SwapObjectProps} from "./type/SwapObjectProps.js"
import type {CreateNodePropsResult} from "./createNodeProps.js"
import {createNodeProps} from "./createNodeProps.js"

export type LeafProps = SwapObjectProps<
  RenderLeafProps,
  CreateNodePropsResult<RenderLeafProps["attributes"]> & {
    children: string
  }
>

export function createLeafProps(node: Text): LeafProps {
  const {key, attributes} = createNodeProps()

  return {
    key,
    leaf: node,
    text: node,
    children: node.text,
    attributes: {
      ...attributes,
      "data-slate-leaf": true
    }
  }
}