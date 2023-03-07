import type {Node} from "../../public/Node.js"

import type {Replace} from "../../public/Replace.js"
import type {InlineDescendant} from "./InlineDescendant.js"

import {ELEMENT_BLOCKQUOTE} from "../constants.js"

export type Blockquote = Replace<Node<typeof ELEMENT_BLOCKQUOTE>, {
  children: InlineDescendant[]
}>
