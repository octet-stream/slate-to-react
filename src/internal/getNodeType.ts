import type {NodeProps, LeafProps, ElementProps} from "./createNodeProps.js"
import type {Descendant} from "./type/Descendant.js"

export const getNodeType = <T extends Descendant>(
  props: NodeProps<T>
): string => (
    typeof (props as unknown as LeafProps).children === "string"
      ? "Text"
      : `Element<${(props as unknown as ElementProps).element.type}>`
  )
