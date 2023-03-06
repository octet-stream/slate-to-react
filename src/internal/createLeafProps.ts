import type {RenderLeafProps} from "slate-react"
import type {Text} from "slate"

import type {SwapObjectProps} from "./type/SwapObjectProps.js"
import type {LeafAttributes} from "./createNodeProps.js"
import type {NodeProps} from "./createNodeProps.js"

import {createNodeProps} from "./createNodeProps.js"

export type LeafProps<T extends Text = Text> = SwapObjectProps<
  RenderLeafProps,
  NodeProps<RenderLeafProps["attributes"]> & {
    leaf: T
    text: T
    children: string
  }
>

export function createLeafProps<T extends Text = Text>(
  node: T
): LeafProps<T> {
  const {attributes} = createNodeProps({
    "data-slate-leaf": true
  })

  return {
    leaf: node,
    text: node,
    children: node.text,
    attributes
  }
}
