import type {FC} from "react"

import {useSlateToReact} from "./useSlateToReact.js"

import type {Node} from "./Node.js"

export interface SlateViewProps {
  /**
   * List of `Slate` nodes to transform
   */
  nodes: Node[]
}

/**
 * Render `Slate` data format as react component
 */
export const SlateView: FC<SlateViewProps> = ({nodes}) => useSlateToReact(nodes)

SlateView.displayName = "SlateView"
