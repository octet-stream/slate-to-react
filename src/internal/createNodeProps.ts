/* eslint-disable @typescript-eslint/indent */

import type {RenderElementProps, RenderLeafProps} from "slate-react"
import type {ReactNode} from "react"

import {nanoid} from "nanoid"

import type {Node} from "../public/Node.js"
import type {Replace} from "../public/Replace.js"
import {NodeNoIdFieldError} from "../public/NodeNoIdFieldError.js"

import type {Descendant} from "./type/Descendant.js"

import {TextNode} from "./type/TextNode.js"

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
type LeafNodeBase<T extends TextNode = TextNode> =
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
  : T extends TextNode
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
export type LeafProps<T extends TextNode = TextNode> =
  Replace<LeafNodeBase<T>, LeafWithChildren & {
    attributes: Replace<LeafNodeBase["attributes"], PropsWithKey>
  }>

type IdGenerator = () => string

interface BaseOptions<TFlag extends boolean> {
  /**
   * If enabled, the `id` field for nodes will not be created
   * and `NodeNoIdFieldError` will be thrown when encountered node without `id` field.
   *
   * Defaults to `false`
   *
   * Note that in future versions the `id` field will be **required** on each node.
   */
  readonly strict?: TFlag

  /**
   * The name of the id property on nodes.
   *
   * Defaults to `"id"`
   */
  idKeyName?: string
}

export interface CreateNodeStrictOptions extends BaseOptions<true> { }

export interface CreateNodeLooseOptions extends BaseOptions<false> {
  /**
   * If `true`, the id for key attribute will be always generated by `slate-to-react`.
   *
   * Defaults to `false`
   */
  forceGenerateId?: boolean

  /**
   * Custom implementation for ID generator.
   *
   * Defaults to [`nanoid`](https://github.com/ai/nanoid)
   */
  idGenerator?: IdGenerator
}

export type CreateNodePropsOptions =
  | CreateNodeLooseOptions
  | CreateNodeStrictOptions

const isStrict = (
  value: CreateNodePropsOptions
): value is CreateNodeStrictOptions => value.strict === true

function assertStrictId(
  id: string | undefined,
  options: CreateNodePropsOptions
): asserts options is CreateNodeLooseOptions {
  if (isStrict(options) && !id) {
    throw new NodeNoIdFieldError()
  }
}

const defaults: Required<CreateNodeLooseOptions> = {
  strict: false,
  idKeyName: "id",
  forceGenerateId: false,
  idGenerator: nanoid
}

/**
 * Generates an ID for node's attributes
 *
 * @param generate Custom implementation for ID generator
 * @param node A node to borrow an existent id from
 * @param key A node's id field key name
 * @param force If `true`, the id for key attribute will be always generated
 */
function generateId<TNode extends TextNode | Node>(
  node: TNode,
  options: Required<CreateNodePropsOptions>
): string {
  const id: string | undefined = node[options.idKeyName as "id"]

  assertStrictId(id, options)

  const {forceGenerateId: force, idGenerator: generate} = options

  if (id && !force) {
    return id
  }

  return generate()
}

/**
 * Creates render props for `Leaf` element
 *
 * @param node Leaf node to create render props for
 */
export const createLeafProps = <T extends TextNode = TextNode>(
  node: T,
  options?: CreateNodePropsOptions
): LeafProps<T> => {
  const opts: Required<CreateNodePropsOptions> = {...defaults, ...options}

  return {
    leaf: node,
    text: node,
    children: node.text,
    attributes: {
      key: generateId(node, opts),
      "data-slate-leaf": true
    }
  }
}

/**
 * Creates render props for `Element` node
 *
 * @param node Element node to create rener props for
 * @param children Descendant ReactElement for this node
 * @param options Additional options
 */
export function createElementProps<T extends Node = Node>(
  node: T,
  children: ReactNode,
  options?: CreateNodePropsOptions
): ElementProps<T> {
  const opts: Required<CreateNodePropsOptions> = {...defaults, ...options}

  return {
    children,
    element: node,
    attributes: {
      key: generateId(node, opts),
      "data-slate-node": "element",
    }
  }
}
