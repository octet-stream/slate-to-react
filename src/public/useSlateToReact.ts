import {useMemo} from "react"

import type {Node} from "./Node.js"
import type {TransformNodesOptions} from "./transformNodes.js"

import {transformNodes} from "./transformNodes.js"

/**
 * Transforms given [Slate](https://slatejs.org) nodes to React elements and memoizes the result.
 *
 * @param nodes List of `Slate` nodes to transform
 * @param options Additional transform options
 *
 * @api public
 */
export const useSlateToReact = (
  nodes: Node[],
  options: TransformNodesOptions = {}
) => useMemo(() => transformNodes(nodes, options), [nodes, options])
