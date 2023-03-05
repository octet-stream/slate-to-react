import type {Element} from "slate"

import type {SwapObjectProps} from "../internal/type/SwapObjectProps.js"

export type Node<T extends string = string> = SwapObjectProps<Element, {
  type: T
}>
