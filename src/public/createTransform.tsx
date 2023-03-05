import type {RenderLeafProps, RenderElementProps} from "slate-react"
import {createElement, ReactNode} from "react"
import type {Text} from "slate"
import type {FC} from "react"

import type {SwapObjectProps} from "../internal/type/SwapObjectProps.js"

import type {
  NodeMatcher,
  LeafNodeMatcher,
  ElementNodeMatcher
} from "./createNodeMatcher.js"
import type {Node} from "./Node.js"

interface BaseTransformProps {
  key: string
  children: ReactNode
}

export type LeafTransformProps<N extends Text = Text> =
  SwapObjectProps<RenderLeafProps, BaseTransformProps & {
    text: N
    leaf: N
  }>

export type ElementTransformProps<N extends Node = Node> =
  SwapObjectProps<RenderElementProps, BaseTransformProps & {
    element: N
  }>

export type CreateTransformProps =
  | LeafTransformProps
  | ElementTransformProps

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
    ? LeafTransformProps<P>
    : LeafTransformProps<Text>
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
    ? ElementTransformProps<P>
    : ElementTransformProps<Node>
  >
) => createTransform(matcher, component)
