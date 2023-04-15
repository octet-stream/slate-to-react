import type {Element} from "slate"

import type {InlineDescendant} from "../internal/type/InlineDescendant.js"
import type {WithId} from "../internal/type/WithId.js"

import type {Replace} from "./Replace.js"

export type Node<T extends string = string> = Replace<Element, {
  type: T
  children: Array<Node | InlineDescendant>
}> & WithId
