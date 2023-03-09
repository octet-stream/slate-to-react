/* eslint-disable @typescript-eslint/indent */

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
 * Better typed base RenderLeafProperties
 *
 * @api private
 */
type LeafNodeBase<T extends Text = Text> =
  Replace<RenderLeafProps, LeafWithChildren & {
    leaf: T
    text: T
  }>

/**
 * @api private
 */
type ElementNodeBase<T extends Node = Node> =
  Replace<
    RenderElementProps,

    ElementWithChildren
      & {
        element: T
      }

      & {
        attributes: Omit<RenderElementProps["attributes"], "ref">
      }
  >

/**
 * @api private
 */
type NodeBaseProps<T extends Descendant> = T extends Node
  ? ElementNodeBase<T>
  : T extends Text
    ? LeafNodeBase<T>
    : never

/**
 * @api private
 */
export type NodeProps<T extends Descendant> = Replace<NodeBaseProps<T>, {
  attributes: Replace<NodeBaseProps<T>["attributes"], PropsWithKey>
}>

/**
 * @api private
 */
export type ElementProps<T extends Node = Node> =
  Replace<ElementNodeBase<T>, {
    attributes: Replace<
      ElementNodeBase["attributes"],

      PropsWithKey
    >
  }>

/**
 * @api private
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
      "data-slate-leaf": true,
      key: nanoid()
    }
  })

/**
 * Creates render props for `Element` node
 *
 * @param node Element node to create rener props for
 * @param children Descendant ReactElement for this node
 * @param options Additional options
 */
export function createElementProps<T extends Node = Node>(
  node: T,
  children: ReactNode
): ElementProps<T> {
  const props: ElementProps<T> = {
    children,
    element: node,
    attributes: {
      key: nanoid(),
      "data-slate-node": "element",
    }
  }

  return props
}
