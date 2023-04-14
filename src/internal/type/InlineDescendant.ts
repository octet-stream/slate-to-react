import type {TextNode} from "../../public/TextNode.js"

import type {RichText} from "./RichText.js"
import type {Link} from "./Link.js"

export type InlineDescendant = TextNode | RichText | Link
