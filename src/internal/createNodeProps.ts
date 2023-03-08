import type {RenderElementProps, RenderLeafProps} from "slate-react"
import type {ReactNode} from "react"
import type {Text} from "slate"

import {nanoid} from "nanoid"

import type {Node} from "../public/Node.js"
import type {Replace} from "../public/Replace.js"

import type {Descendant} from "./type/Descendant.js"

/**
 * @api private
 */
interface PropsWithKey {
  key: string
}

/**
 * @api private
 */
interface LeafWithChildren {
  children: string
}

/**
 * @api private
 */
interface ElementWithChildren {
  children: ReactNode
}

/**
 * @api private
 */
export type LeafNodeBase<T extends Text = Text> =
  Replace<RenderLeafProps, LeafWithChildren & {
    leaf: T
    text: T
  }>

/**
 * @api private
 */
export type ElementNodeBase<T extends Node = Node> =
  Replace<RenderElementProps, ElementWithChildren & {
    element: T
  }>

/**
 * @api private
 */
export type NodeBaseProps<T extends Descendant> = T extends Node
  ? ElementNodeBase<T>
  : T extends Text
    ? LeafNodeBase<T>
    : never

/**
 * @api private
 */
export type NodeProps<T extends Descendant> = Replace<NodeBaseProps<T>, {
  attributes: NodeBaseProps<T>["attributes"] & PropsWithKey
}>

/**
 * @api public
 */
export type ElementProps<T extends Node = Node> =
  Replace<ElementNodeBase<T>, {
    attributes: Replace<ElementNodeBase["attributes"], PropsWithKey>
  }>

/**
 * @api public
 */
export type LeafProps<T extends Text = Text> =
  Replace<LeafNodeBase<T>, LeafWithChildren & {
    attributes: Replace<LeafNodeBase["attributes"], PropsWithKey>
  }>

/**
 * Creates render props for `Leaf` element
 *
 * @param node Leaf node to create render props for
 */
export const createLeafProps = <T extends Text = Text>(
  node: T
): LeafProps<T> => ({
    leaf: node,
    text: node,
    children: node.text,
    attributes: {
      key: nanoid(),
      "data-slate-leaf": true,
    }
  })

export interface CreateElementPropsOptions {
  inline?: boolean
  void?: boolean
}

/**
 * Creates render props for `Element` node
 *
 * @param node Element node to create rener props for
 * @param options Additional options
 */
export function createElementProps<T extends Node = Node>(
  node: T,
  children: ReactNode,
  options: CreateElementPropsOptions = {}
): ElementProps<T> {
  const props: ElementProps<T> = {
    children,
    element: node,
    attributes: {
      ref: null,
      key: nanoid(),
      "data-slate-node": "element",
    }
  }

  if (options.inline) {
    props.attributes["data-slate-inline"] = true
  }

  if (options.void) {
    props.attributes["data-slate-void"] = true
  }

  return props
}
