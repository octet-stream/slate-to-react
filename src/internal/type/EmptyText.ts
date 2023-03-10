import type {TextNode} from "./TextNode.js"

import {Replace} from "../../public/Replace.js"

export type EmptyText = Replace<TextNode, {
  text: ""
}>
