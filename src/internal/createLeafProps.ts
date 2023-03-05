import type {RenderLeafProps} from "slate-react"
import type {Text} from "slate"

import type {SwapObjectProps} from "./type/SwapObjectProps.js"
import type {CreateNodePropsResult} from "./createNodeProps.js"
import {createNodeProps} from "./createNodeProps.js"

export type LeafProps<T extends Text = Text> = SwapObjectProps<
  RenderLeafProps,
  CreateNodePropsResult<RenderLeafProps["attributes"]> & {
    leaf: T
    text: T
    children: string
  }
>

export function createLeafProps<T extends Text = Text>(
  node: T
): LeafProps<T> {
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
