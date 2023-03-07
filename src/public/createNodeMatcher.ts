import {Text} from "slate"

import type {NodeProps} from "../internal/createNodeProps.js"

import type {Node} from "./Node.js"

export type NodeMatcher<T extends Node | Text> =
  (node: NodeProps<T>) => node is NodeProps<T>

export type LeafNodeMatcher<TLeaf extends Text = Text> =
  NodeMatcher<TLeaf>

export type ElementNodeMatcher<TElement extends Node = Node> =
  NodeMatcher<TElement>

/**
 * Helps creating typed `LeafNodeMatcher`.
 * This function does nothing other than adding proper types for given matcher function.
 *
 * @param matcher A `LeafNodeMatcher` implementation function.
 */
export const createLeafNodeMatcher = <TLeaf extends Text = Text>(
  matcher: LeafNodeMatcher<TLeaf>
): LeafNodeMatcher<TLeaf> => matcher

/**
 * Helps creating typed `ElementNodeMatcher`.
 * This function does nothing other than adding proper types for given matcher function.
 *
 * @param matcher An `ElementNodeMatcher` implementation function.
 */
export const createElementNodeMatcher = <TElement extends Node = Node>(
  matcher: ElementNodeMatcher<TElement>
): ElementNodeMatcher<TElement> => matcher
