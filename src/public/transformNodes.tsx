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

import type {CreateTransformResult} from "./createTransform.js"
import type {Node} from "./Node.js"

/**
 * @api private
 */
type Descendant = Node | Text

/**
 * @api private
 */
function getTransform<TProps extends ElementProps | LeafProps>(
  transforms: readonly CreateTransformResult<TProps>[],
  props: TProps
) {
  const transform = transforms.find(({matcher}) => matcher(props as any))

  if (!transform) {
    throw new NoMatcherError(props)
  }

  return transform.transform
}

/**
 * @api private
 */
const getLeafTransform = (props: LeafProps) => getTransform(leaves, props)

/**
 * @api private
 */
const getElementTransform = (props: ElementProps) => (
  getTransform(elements as any, props)
)

/**
 * @api private
 */
function compileNodes(nodes: Descendant[]): ReactElement {
  const result: ReactElement[] = []

  for (const node of nodes) {
    if (Element.isElement(node)) {
      const children = compileNodes(node.children)
      const props = createElementProps({...node, children})
      const transform = getElementTransform(props)
      const element = transform(props)

      result.push(element)
    } else {
      const props = createLeafProps(node)
      const transform = getLeafTransform(props)
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
export const transformNodes = (nodes: Node[]): ReactElement => {
  const result: ReactElement[] = []

  for (const node of nodes) {
    if (Element.isElement(node)) {
      const children = compileNodes(node.children)
      const props = createElementProps({...node, children})
      const transform = getElementTransform(props)
      const element = transform(props)

      result.push(element)
    } else {
      throw new TypeError("Root element must be of Element type")
    }
  }

  return createElement(Fragment, undefined, result)
}
