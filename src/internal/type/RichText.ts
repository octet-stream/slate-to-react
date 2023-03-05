import type {Text} from "slate"

export interface RichText extends Text {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  superscript?: boolean
  subscript?: boolean
  code?: boolean
}
