import type {FC} from "react"

import {useSlateToReact} from "./useSlateToReact.js"

import type {TransformNodesOptions} from "./transformNodes.js"
import type {Node} from "./Node.js"

export interface SlateViewProps extends TransformNodesOptions {
  /**
   * List of `Slate` nodes to transform
   */
  nodes: Node[]
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
