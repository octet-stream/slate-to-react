import type {RichText, SubscriptRichText} from "./type/RichText.js"

export const isSubscriptRichText = (
  value: RichText
): value is SubscriptRichText =>
  typeof (value as SubscriptRichText).subscript === "boolean"
