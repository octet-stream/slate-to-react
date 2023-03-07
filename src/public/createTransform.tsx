import type {ReactElement} from "react"
import type {Text} from "slate"

import type {NodeProps} from "../internal/createNodeProps.js"

import type {
  NodeMatcher,
  LeafNodeMatcher,
  ElementNodeMatcher
} from "./createNodeMatcher.js"
import type {Node} from "./Node.js"

export type TransformImplementation<TNode extends Node | Text> =
  (props: NodeProps<TNode>) => ReactElement

export type CreateTransformProps<T extends Node | Text> = NodeProps<T>

export interface NodeTransform<TNode extends Node | Text> {
  matcher: NodeMatcher<TNode>
  transform: TransformImplementation<TNode>
}

export type LeafTransform<TLeaf extends Text = Text> =
  NodeTransform<TLeaf>

export type ElementTransform<TElement extends Node = Node> =
  NodeTransform<TElement>

/**
 * @api private
 */
const createTransform = <TNode extends Node | Text>(
  matcher: NodeMatcher<TNode>,
  transform: TransformImplementation<TNode>
): NodeTransform<TNode> => ({matcher, transform})

/**
 * Creates a leaf node transform. It takes `LeafNodeMatcher` as the first argument to match any specific node during `transformNodes` call, and `transform` implementation as the second argument. This transform implementation then will be called for each matched node to create a `ReactElement` for this node.
 *
 * @param matcher An `LeafNodeMatcher` implementation
 * @param transform Transform implementation to render matched node with
 */
export const createLeafTransform = <TLeaf extends Text = Text>(
  matcher: LeafNodeMatcher<TLeaf>,
  transform: TransformImplementation<TLeaf>
): LeafTransform<TLeaf> => createTransform(matcher, transform)

/**
 * Creates an element node transform. It takes `ElementNodeMatcher` as the first argument to match any specific node during `transformNodes` call, and `transform` implementation as the second argument. This transform implementation then will be called for each matched node to create a `ReactElement` for this node.
 *
 * @param matcher An `ElementNodeMatcher` implementation
 * @param transform Transform implementation to render matched node with
 */
export const createElementTransform = <TElement extends Node = Node>(
  matcher: ElementNodeMatcher<TElement>,
  transform: TransformImplementation<TElement>
): ElementTransform<TElement> => createTransform(matcher, transform)
