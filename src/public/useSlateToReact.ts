import {useMemo} from "react"

import type {Node} from "./Node.js"

import {transformNodes} from "./transformNodes.js"

/**
 * Transforms given [Slate](https://slatejs.org) nodes to React elements and memoizes the result.
 *
 * @param nodes List of `Slate` nodes to transform
 *
 * @api public
 */
export const useSlateToReact = (nodes: Node[]) => (
  useMemo(() => transformNodes(nodes), [nodes])
)
