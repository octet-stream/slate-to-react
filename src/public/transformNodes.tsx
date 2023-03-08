import {createElement, Fragment} from "react"
import type {ReactElement} from "react"
import {Element} from "slate"
import type {Text} from "slate"

import type {
  ElementProps,
  LeafProps,
  NodeProps
} from "../internal/createNodeProps.js"
import type {Descendant} from "../internal/type/Descendant.js"

import {NoMatcherError} from "../internal/NoMatcherError.js"
import {leaves, elements} from "../internal/defaultTransforms.js"

import {
  createLeafProps,
  createElementProps
} from "../internal/createNodeProps.js"

import type {
  NodeTransform,
  LeafTransform,
  ElementTransform,
  TransformImplementation
} from "./createTransform.js"
import type {Node} from "./Node.js"

/**
 * Custom transforms for `Slate` nodes
 */
export interface Transforms {
  /**
   * A list of transforms for `leaf` nodes
   */
  leaves?: LeafTransform<any>[] // FIXME: I give up for now, but this must be fixed.

  /**
   * A list of transforms for `element` nodes
   */
  elements?: ElementTransform<any>[] // FIXME: I give up for now, but this must be fixed.
}

export interface TransformNodesOptions {
  /**
   * Custom transforms for `Slate` nodes
   */
  transforms?: Transforms
}

/**
 * @api private
 */
function getTransform<TNode extends Descendant>(
  props: NodeProps<TNode>,
  transforms: NodeTransform<TNode>[]
): TransformImplementation<TNode> {
  const transform = transforms.find(({matcher}) => matcher(props))

  if (!transform) {
    throw new NoMatcherError(props)
  }

  return transform.transform
}

/**
 * @api private
 */
const getLeafTransform = (
  props: LeafProps<Text>,
  transforms: NodeTransform<Text>[]
): TransformImplementation<Text> => getTransform(props, transforms)

/**
 * @api private
 */
const getElementTransform = (
  props: ElementProps<Node>,
  transforms: NodeTransform<Node>[]
): TransformImplementation<Node> => getTransform(props, transforms)

/**
 * @api private
 */
function compileNodes(
  nodes: Descendant[],
  transforms: Required<Transforms>
): ReactElement {
  const result: ReactElement[] = []

  for (const node of nodes) {
    if (Element.isElement(node)) {
      const children = compileNodes(node.children, transforms)
      const props = createElementProps(node, children)
      const transform = getElementTransform(props, transforms.elements)
      const element = transform(props)

      result.push(element)
    } else {
      const props = createLeafProps(node)
      const transform = getLeafTransform(props, transforms.leaves)
      const element = transform(props)

      result.push(element)
    }
  }

  return createElement(Fragment, undefined, result)
}

/**
 * Transforms given [Slate](https://slatejs.org) nodes to React elements.
 *
 * @param nodes List of `Slate` nodes to transform
 * @param options Additional transform options
 *
 * @api public
 */
export const transformNodes = (
  /* eslint-disable @typescript-eslint/indent */
  /* eslint-disable indent */
  nodes: Node[],
  options: TransformNodesOptions = {}
): ReactElement => {
  /* eslint-enable @typescript-eslint/indent */
  /* eslint-enable indent */
  const result: ReactElement[] = []

  const transforms: Required<Transforms> = {
    leaves: [...(options.transforms?.leaves ?? []), ...leaves],
    elements: [...(options.transforms?.elements ?? []), ...elements]
  }

  for (const node of nodes) {
    if (Element.isElement(node)) {
      const children = compileNodes(node.children, transforms)
      const props = createElementProps(node, children)
      const transform = getElementTransform(props, transforms.elements)
      const element = transform(props)

      result.push(element)
    } else {
      throw new TypeError("Root element must be of Element type")
    }
  }

  return createElement(Fragment, undefined, result)
}
