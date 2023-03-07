import {createElement, Fragment} from "react"
import type {ReactElement} from "react"
import {Element} from "slate"
import type {Text} from "slate"

import type {ElementProps, LeafProps} from "../internal/createNodeProps.js"

import {NoMatcherError} from "../internal/NoMatcherError.js"
import {leaves, elements} from "../internal/defaultTransforms.js"

import {
  createLeafProps,
  createElementProps
} from "../internal/createNodeProps.js"

import type {
  CreateTransformResult,
  CreateLeafTransformResult,
  CreateElementTransformResult
} from "./createTransform.js"
import type {Node} from "./Node.js"

export interface Transforms {
  leaves?: CreateLeafTransformResult[]
  elements?: CreateElementTransformResult[]
}

export interface TransformNodesOptions {
  transforms?: Transforms
}

/**
 * @api private
 */
type Descendant = Node | Text

/**
 * @api private
 */
function getTransform<TProps extends ElementProps | LeafProps>(
  props: TProps,
  transforms: CreateTransformResult<TProps>[]
) {
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
  props: LeafProps,
  transforms: CreateTransformResult<LeafProps>[]
) => getTransform(props, transforms)

/**
 * @api private
 */
const getElementTransform = (
  props: ElementProps,
  transforms: CreateTransformResult<ElementProps>[]
) => getTransform(props, transforms)

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
      const props = createElementProps({...node, children})
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

  const transforms = {
    leaves: (options.transforms?.leaves ?? []).concat(leaves),
    elements: (options.transforms?.elements ?? []).concat(elements as any)
  }

  for (const node of nodes) {
    if (Element.isElement(node)) {
      const children = compileNodes(node.children, transforms)
      const props = createElementProps({...node, children})
      const transform = getElementTransform(props, transforms.elements)
      const element = transform(props)

      result.push(element)
    } else {
      throw new TypeError("Root element must be of Element type")
    }
  }

  return createElement(Fragment, undefined, result)
}
