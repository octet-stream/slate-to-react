import type {Node} from "../../public/Node.js"

import type {InlineDescendant} from "./InlineDescendant.js"
import type {SwapObjectProps} from "./SwapObjectProps.js"
import type {WithAlignment} from "./Alignment.js"

import {ELEMENT_PARAGRAPH} from "../constants.js"

export type Paragraph = SwapObjectProps<Node<typeof ELEMENT_PARAGRAPH>, {
  children: InlineDescendant[]
}> & WithAlignment
