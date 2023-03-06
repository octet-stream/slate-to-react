import {createElement} from "react"
import type {Text} from "slate"
import type {FC} from "react"

import type {ElementProps} from "../internal/createElementProps.js"
import type {LeafProps} from "../internal/createLeafProps.js"

import type {
  NodeMatcher,
  LeafNodeMatcher,
  ElementNodeMatcher
} from "./createNodeMatcher.js"
import type {Node} from "./Node.js"

export type CreateTransformProps =
  | LeafProps
  | ElementProps

export interface CreateTransformResult<
  TProps extends CreateTransformProps = CreateTransformProps,
  TMatcher extends NodeMatcher = NodeMatcher
> {
  matcher: TMatcher
  componnet: FC<TProps>
}

export const createTransform = <
  TProps extends CreateTransformProps,
  TMatcher extends NodeMatcher,
>(
  matcher: TMatcher,
  component: FC<TProps>
): CreateTransformResult<TProps, TMatcher> => {
  const SlateTransform: FC<TProps> = props => createElement(component, props)

  SlateTransform.displayName = `SlateTransform(${
    component.displayName || "Unknown"
  })`

  return {componnet: SlateTransform, matcher}
}

/**
 * Creates a `Text` node transform
 *
 * @param matcher An `LeafNodeMatcher` implementation
 * @param component React component to render this node with
 */
export const createLeafTransform = <TMatcher extends LeafNodeMatcher>(
  matcher: TMatcher,
  component: FC<
    TMatcher extends LeafNodeMatcher<infer P>
    ? LeafProps<P>
    : LeafProps<Text>
  >
) => createTransform(matcher, component)

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
  component: FC<
    TMatcher extends ElementNodeMatcher<infer P>
    ? ElementProps<P>
    : ElementProps<Node>
  >
) => createTransform(matcher, component)
