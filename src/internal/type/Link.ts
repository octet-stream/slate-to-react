import type {Replace} from "../../public/Replace.js"
import type {Node} from "../../public/Node.js"

import type {ELEMENT_LINK} from "../constants.js"

import type {TextDescendant} from "./TextDescendant.js"

interface WithUrl {
  url: string
}

export type Link = Replace<
  Node<typeof ELEMENT_LINK>,
  {
    children: TextDescendant[]
  }
> &
  WithUrl
