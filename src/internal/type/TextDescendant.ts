import type {TextNode} from "../../public/TextNode.js"

import type {RichText} from "./RichText.js"
import type {EmptyText} from "./EmptyText.js"

export type TextDescendant = EmptyText | RichText | TextNode
