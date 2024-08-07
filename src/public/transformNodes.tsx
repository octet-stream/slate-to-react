import {createElement, Fragment} from "react"
import type {ReactElement} from "react"
import {Element} from "slate"

import type {CreateNodePropsOptions} from "../internal/createNodeProps.js"
import type {Descendant} from "../internal/type/Descendant.js"
import type {TextNode} from "./TextNode.js"

import {defaultLeaves, defaultElements} from "../internal/defaultTransforms.js"

import {InvalidRootNodeTypeError} from "./InvalidRootNodeTypeError.js"
import {NoMatcherError} from "./NoMatcherError.js"

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

type CompileNodesOptions = CreateNodePropsOptions & {}

export type TransformNodesOptions = CreateNodePropsOptions & {
  /**
   * Custom transforms for `Slate` nodes
   */
  transforms?: Transforms

  /**
   * Controls whether default transforms enabled or not.
   *
   * Default to `true`
   */
  defaultTransforms?: boolean
}

const defaults: TransformNodesOptions = {
  strict: false,
  defaultTransforms: true
}

/**
 * @api private
 */
function getTransform<TNode extends Descendant>(
  node: TNode,
  transforms: NodeTransform<TNode>[]
): TransformImplementation<TNode> {
  const matched = transforms.find(({matcher}) => matcher(node))

  if (!matched) {
    throw new NoMatcherError(node)
  }

  return matched.transform
}

/**
 * @api private
 */
const getLeafTransform = (
  node: TextNode,
  transforms: NodeTransform<TextNode>[]
): TransformImplementation<TextNode> => getTransform(node, transforms)

/**
 * @api private
 */
const getElementTransform = (
  node: Node,
  transforms: NodeTransform<Node>[]
): TransformImplementation<Node> => getTransform(node, transforms)

/**
 * Compiles Slate nodes into React elements tree.
 *
 * @api private
 */
function compileNodes(
  nodes: Descendant[],
  transforms: Required<Transforms>,
  options?: CompileNodesOptions,
  isRootElement = false
): ReactElement {
  const result: ReactElement[] = []

  for (const node of nodes) {
    if (Element.isElement(node)) {
      const children = compileNodes(node.children, transforms)
      const transform = getElementTransform(node, transforms.elements)
      const props = createElementProps(node, children, options)
      const element = transform(props)

      result.push(element)
    } else if (isRootElement === false) {
      const transform = getLeafTransform(node, transforms.leaves)
      const props = createLeafProps(node, options)
      const element = transform(props)

      result.push(element)
    } else {
      throw new InvalidRootNodeTypeError()
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
export function transformNodes(
  nodes: Node[],
  options?: TransformNodesOptions
): ReactElement {
  const {defaultTransforms, ...mergedOptions} = {...defaults, ...options}

  const transforms: Required<Transforms> = {
    leaves: mergedOptions.transforms?.leaves?.slice() ?? [],
    elements: mergedOptions.transforms?.elements?.slice() ?? []
  }

  if (defaultTransforms) {
    transforms.leaves.push(...defaultLeaves)
    transforms.elements.push(...defaultElements)
  }

  return compileNodes(nodes, transforms, mergedOptions, true)
}
