import type {Element} from "slate"

import type {InlineDescendant} from "../internal/type/InlineDescendant.js"
import type {SwapObjectProps} from "../internal/type/SwapObjectProps.js"

export type Node<T extends string = string> = SwapObjectProps<Element, {
  type: T
  children: Array<Node | InlineDescendant>
}>
