import type {Node} from "../../public/Node.js"

import type {Replace} from "../../public/Replace.js"
import type {RichText} from "./RichText.js"

import type {TextNode} from "./TextNode.js"
import {ELEMENT_LINK} from "../constants.js"

interface WithUrl {
  url: string
}

export type Link = Replace<Node<typeof ELEMENT_LINK>, {
  children: Array<TextNode | RichText>
}> & WithUrl
