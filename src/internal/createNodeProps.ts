import type {RenderElementProps, RenderLeafProps} from "slate-react"

export type LeafAttributes = RenderLeafProps["attributes"]

export type ElementAttributes = RenderElementProps["attributes"]

export type Attributes =
  | LeafAttributes
  | ElementAttributes

export interface NodeProps<TAttributes extends Attributes = Attributes> {
  attributes: TAttributes & {
    key: string
  }
}

export function createNodeProps<
  TAttributes extends Attributes = Attributes
>(attributes: TAttributes): NodeProps<TAttributes> {
  const key = crypto.randomUUID()

  return {attributes: {...attributes, key}}
}
