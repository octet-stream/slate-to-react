import type {Replace} from "../../public/Replace.js"
import type {Node} from "../../public/Node.js"

import type {InlineDescendant} from "./InlineDescendant.js"

import type {ELEMENT_BLOCKQUOTE} from "../constants.js"

export type Blockquote = Replace<
  Node<typeof ELEMENT_BLOCKQUOTE>,
  {
    children: InlineDescendant[]
  }
>
