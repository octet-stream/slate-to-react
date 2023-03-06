import type {LeafProps, ElementProps} from "./createNodeProps.js"

const isLeafProps = (
  props: ElementProps | LeafProps
): props is LeafProps => (
  typeof (props as LeafProps).children === "string"
    && "leaf" in props
    && "text" in props
)

export const getNodeType = (props: ElementProps | LeafProps): string => (
  isLeafProps(props) ? "Text" : `Element<${props.element.type}>`
)
