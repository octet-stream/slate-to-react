import type {TextNode} from "../../public/TextNode.js"
import type {Replace} from "../../public/Replace.js"
import type {Node} from "../../public/Node.js"

import {ELEMENT_LINK} from "../constants.js"

import type {RichText} from "./RichText.js"

interface WithUrl {
  url: string
}

export type Link = Replace<Node<typeof ELEMENT_LINK>, {
  children: Array<TextNode | RichText>
}> & WithUrl
