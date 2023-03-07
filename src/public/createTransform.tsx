import type {ReactElement} from "react"
import type {Text} from "slate"

import type {ElementProps, LeafProps} from "../internal/createNodeProps.js"

import type {
  NodeMatcher,
  LeafNodeMatcher,
  ElementNodeMatcher
} from "./createNodeMatcher.js"
import type {Node} from "./Node.js"

type Transform<TProps> = (props: TProps) => ReactElement

export type CreateTransformProps = LeafProps | ElementProps

export interface CreateTransformResult<
TProps extends CreateTransformProps = CreateTransformProps
> {
  matcher: NodeMatcher<TProps>
  transform: Transform<TProps>
}

export type CreateLeafTransformResult<TLeaf extends Text = Text> =
  CreateTransformResult<LeafProps<TLeaf>>

export type CreateElementTransformResult<TElement extends Node = Node> =
  CreateTransformResult<ElementProps<TElement>>

/**
 * @api private
 */
const createTransform = <TProps extends CreateTransformProps>(
  matcher: NodeMatcher<TProps>,
  transform: Transform<TProps>
): CreateTransformResult<TProps> => ({matcher, transform})

/**
 * Creates a leaf node transform. It takes `LeafNodeMatcher` as the first argument to match any specific node during `transformNodes` call, and `transform` implementation as the second argument. This transform implementation then will be called for each matched node to create a `ReactElement` for this node.
 *
 * @param matcher An `LeafNodeMatcher` implementation
 * @param transform Transform implementation to render matched node with
 */
export const createLeafTransform = <TLeaf extends Text = Text>(
  matcher: LeafNodeMatcher<TLeaf>,
  transform: Transform<LeafProps<TLeaf>>
): CreateLeafTransformResult<TLeaf> => createTransform(matcher, transform)

/**
 * Creates an element node transform. It takes `ElementNodeMatcher` as the first argument to match any specific node during `transformNodes` call, and `transform` implementation as the second argument. This transform implementation then will be called for each matched node to create a `ReactElement` for this node.
 *
 * @param matcher An `ElementNodeMatcher` implementation
 * @param transform Transform implementation to render matched node with
 */
export const createElementTransform = <TElement extends Node = Node>(
  matcher: ElementNodeMatcher<TElement>,
  transform: Transform<ElementProps<TElement>>
): CreateElementTransformResult<TElement> => createTransform(matcher, transform)
