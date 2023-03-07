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
 * Creates a `Text` node transform
 *
 * @param matcher An `LeafNodeMatcher` implementation
 * @param transform Transform implementation to render this node with
 */
export const createLeafTransform = <TLeaf extends Text = Text>(
  matcher: LeafNodeMatcher<TLeaf>,
  transform: Transform<LeafProps<TLeaf>>
): CreateLeafTransformResult<TLeaf> => createTransform(matcher, transform)

/**
 * Creates an `Element` node transform
 *
 * @param matcher An `ElementNodeMatcher` implementation
 * @param transform Transform implementation to render this node with
 */
export const createElementTransform = <TElement extends Node = Node>(
  matcher: ElementNodeMatcher<TElement>,
  transform: Transform<ElementProps<TElement>>
): CreateElementTransformResult<TElement> => createTransform(matcher, transform)
