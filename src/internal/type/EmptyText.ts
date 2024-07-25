import type {TextNode} from "../../public/TextNode.js"
import type {Replace} from "../../public/Replace.js"

export type EmptyText = Replace<
  TextNode,
  {
    text: ""
  }
>
