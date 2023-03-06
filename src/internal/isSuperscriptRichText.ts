import type {RichText, SuperscriptRichText} from "./type/RichText.js"

export const isSuperscriptRichText = (
  value: RichText
): value is SuperscriptRichText => (
  typeof (value as SuperscriptRichText).superscript === "boolean"
)
