import {Text} from "slate"

import type {Node} from "./Node.js"

/**
 * Matches node of given type that satisfy predicate
 *
 * @api public
 */
export type NodeMatcher<T extends Node | Text> = (node: T) => node is T

/**
 * Matches a `Text` node that satisfy predicate
 *
 * @api public
 */
export type LeafNodeMatcher<TLeaf extends Text = Text> =
  NodeMatcher<TLeaf>

/**
 * Matches an `Element` node
 *
 * @api public
 */
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
