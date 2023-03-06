import type {ReactElement} from "react"
import type {Text} from "slate"

import type {ElementProps} from "../internal/createElementProps.js"
import type {LeafProps} from "../internal/createLeafProps.js"

import type {
  NodeMatcher,
  LeafNodeMatcher,
  ElementNodeMatcher
} from "./createNodeMatcher.js"
import type {Node} from "./Node.js"

type Transform<TProps> = (props: TProps) => ReactElement

export type CreateTransformProps =
  | LeafProps
  | ElementProps

export interface CreateTransformResult<
  TProps extends CreateTransformProps = CreateTransformProps,
  TMatcher extends NodeMatcher = NodeMatcher
> {
  matcher: TMatcher
  transform: Transform<TProps>
}

export const createTransform = <
  TProps extends CreateTransformProps,
  TMatcher extends NodeMatcher,
>(
  matcher: TMatcher,
  component: Transform<TProps>
): CreateTransformResult<TProps, TMatcher> => ({matcher, transform: component})

/**
 * Creates a `Text` node transform
 *
 * @param matcher An `LeafNodeMatcher` implementation
 * @param component React component to render this node with
 */
export const createLeafTransform = <TMatcher extends LeafNodeMatcher>(
  matcher: TMatcher,
  component: Transform<
    TMatcher extends LeafNodeMatcher<infer P>
      ? LeafProps<P>
      : LeafProps<Text>
  >
) => createTransform(matcher as any, component)

/**
 * Creates an `Element` node transform
 *
 * @param matcher An `ElementNodeMatcher` implementation
 * @param component React component to render this node with
 */
export const createElementTransform = <
  TMatcher extends ElementNodeMatcher
>(
  matcher: TMatcher,
  component: Transform<
    TMatcher extends ElementNodeMatcher<infer P>
      ? ElementProps<P>
      : ElementProps<Node>
  >
) => createTransform(matcher as any, component)
