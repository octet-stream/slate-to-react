import {Text} from "slate"

import type {ElementProps, LeafProps} from "../internal/createNodeProps.js"

import type {CreateTransformProps} from "./createTransform.js"
import type {Node} from "./Node.js"

export type NodeMatcher<T extends CreateTransformProps = CreateTransformProps> =
  (node: T) => node is T

export type LeafNodeMatcher<TLeaf extends Text = Text> =
  NodeMatcher<LeafProps<TLeaf>>

export type ElementNodeMatcher<TElement extends Node = Node> =
  NodeMatcher<ElementProps<TElement>>

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
