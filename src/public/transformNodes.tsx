import {createElement, Fragment} from "react"
import type {ReactElement} from "react"
import {Text} from "slate"
import {Element} from "slate"

import type {ElementProps} from "../internal/createElementProps.js"
import type {LeafProps} from "../internal/createLeafProps.js"

import {NoMatcherError} from "../internal/NoMatcherError.js"
import {createLeafProps} from "../internal/createLeafProps.js"
import {leaves, elements} from "../internal/defaultTransforms.js"
import {createElementProps} from "../internal/createElementProps.js"

import type {CreateTransformResult} from "./createTransform.js"
import type {Node} from "./Node.js"

type Descendant = Node | Text

function getComponent<
  TTransforms extends readonly CreateTransformResult[],
  TProps extends ElementProps | LeafProps
>(
  transforms: TTransforms,
  props: TProps
) {
  const transform = transforms.find(({matcher}) => matcher(props))

  if (!transform) {
    throw new NoMatcherError(props)
  }

  return transform.componnet
}

const getLeafComponent = (props: LeafProps) => getComponent(leaves, props)

const getElementComponent = (props: ElementProps) => getComponent(elements, props)

function compileNodes(nodes: Descendant[]): ReactElement {
  const result: ReactElement[] = []

  for (const node of nodes) {
    if (Element.isElement(node)) {
      const props = createElementProps(node)
      const component = getElementComponent(props)
      const element = createElement(component, props, compileNodes(node.children))

      result.push(element)
    } else {
      const props = createLeafProps(node)
      const component = getLeafComponent(props)
      const element = createElement(component, props, props.children)

      result.push(element)
    }
  }

  return createElement(Fragment, undefined, result)
}

export const transformNodes = (nodes: Node[]): ReactElement => {
  const result: ReactElement[] = []

  for (const node of nodes) {
    if (Element.isElement(node)) {
      const props = createElementProps(node)
      const componnet = getElementComponent(props)
      const element = createElement(
        componnet,
        props as any,
        compileNodes(node.children)
      )

      result.push(element)
    } else {
      throw new TypeError("Root element must be of Element type.")
    }
  }

  return createElement(Fragment, undefined, result)
}
