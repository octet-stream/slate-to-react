import type {Text} from "slate"

import type {Node} from "../../public/Node.js"

import type {RichText} from "./RichText.js"
import type {Replace} from "../../public/Replace.js"

import {ELEMENT_LINK} from "../constants.js"

export type Link = Replace<Node<typeof ELEMENT_LINK>, {
  children: Array<Text | RichText>
}> & {
  url: string
}
