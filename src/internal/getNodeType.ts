import type {Descendant} from "./type/Descendant.js"
import type {TextNode} from "./type/TextNode.js"

const isLeaf = (value: unknown): value is TextNode => (
  typeof value === "object"
    && value != null
    && typeof (value as TextNode).text === "string"
    && "children" in value === false
)

export const getNodeType = <T extends Descendant>(
  node: T
): string => isLeaf(node) ? "Text" : `Node<${node.type || "unknown"}>`
