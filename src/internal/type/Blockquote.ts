import type {Node} from "../../public/Node.js"

import type {SwapObjectProps} from "./SwapObjectProps.js"
import type {InlineDescendant} from "./InlineDescendant.js"

import {ELEMENT_BLOCKQUOTE} from "../constants.js"

export type Blockquote = SwapObjectProps<Node<typeof ELEMENT_BLOCKQUOTE>, {
  children: InlineDescendant[]
}>
