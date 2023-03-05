import type {FC} from "react"
import {useMemo} from "react"

import {transformNodes} from "./transformNodes.js"
import {Node} from "./Node.js"

export interface SlateViewProps {
  /**
   * List of `Slate` nodes to transform
   */
  nodes: Node[]
}

/**
 * Render `Slate` data format as react component
 */
export const SlateView: FC<SlateViewProps> = ({nodes}) => {
  const view = useMemo(() => transformNodes(nodes), [nodes])

  return view
}

SlateView.displayName = "SlateView"
