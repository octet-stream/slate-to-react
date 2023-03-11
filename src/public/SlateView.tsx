import type {FC} from "react"

import type {CreateNodePropsOptions} from "../internal/createNodeProps.js"

import {useSlateToReact} from "./useSlateToReact.js"

import type {Transforms} from "./transformNodes.js"
import type {Node} from "./Node.js"

export interface SlateViewProps extends CreateNodePropsOptions {
  /**
   * List of `Slate` nodes to transform
   */
  nodes: Node[]

  /**
   * Custom transforms for `Slate` nodes
   */
  transforms?: Transforms
}

/**
 * Render `Slate` data format as react component
 *
 * @api public
 */
export const SlateView: FC<SlateViewProps> = ({
  nodes,

  ...options
}) => useSlateToReact(nodes, options)

SlateView.displayName = "SlateView"
