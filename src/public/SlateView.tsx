import type {FC} from "react"

import {useSlateToReact} from "./useSlateToReact.js"

import type {Transforms} from "./transformNodes.js"
import type {Node} from "./Node.js"

export interface SlateViewProps {
  /**
   * List of `Slate` nodes to transform
   */
  nodes: Node[]

  transforms?: Transforms
}

/**
 * Render `Slate` data format as react component
 *
 * @api public
 */
export const SlateView: FC<SlateViewProps> = ({nodes, transforms}) => (
  useSlateToReact(nodes, {transforms})
)

SlateView.displayName = "SlateView"
