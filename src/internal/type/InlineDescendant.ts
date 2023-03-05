import type {Text} from "slate"

import type {Link} from "./Link.js"
import type {RichText} from "./RichText.js"

export type InlineDescendant = Text | RichText | Link
