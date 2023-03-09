import type {Text} from "slate"

import type {Descendant} from "./type/Descendant.js"

const isLeaf = (value: unknown): value is Text => (
  typeof value === "object"
    && value != null
    && typeof (value as Text).text === "string"
    && "children" in value === false
)

export const getNodeType = <T extends Descendant>(
  node: T
): string => isLeaf(node) ? "Text" : `Node<${node.type || "unknown"}>`
