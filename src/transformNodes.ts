import {Text, Element} from "slate"
import {createElement} from "react"
import {ReactNode} from "react"

interface ElementNode extends Element {
  type: string
  children: Node[]
}

type Node = Text | ElementNode

interface NodeTransformContext<T extends string> {
  type: T
  node: Node
  children: ReactNode
}

interface NodeTransform<T extends string = string> {
  (ctx: NodeTransformContext<T>): JSX.Element
}

type CreateNodeTransformResult<T extends string = string> = [
  type: T, transform: NodeTransform<T>
]

const createNodeTransform = <T extends string>(
  type: T,
  transform: NodeTransform<T>
): CreateNodeTransformResult<T> => [type, transform]

function iterateNodes<R extends Node[]>(
  root: R,
  transforms: Map<string, NodeTransform>
): JSX.Element[] {
  const res = []

  for (const node of root) {
    if (Element.isElement(node)) { // element node
      const transform = transforms.get(node.type)

      // TODO: Add default transforms
      if (!transform) {
        throw new Error(`Can't find transform for node type: ${node.type}`)
      }

      const element = transform({
        node,
        type: node.type,
        children: iterateNodes(
          node.children,
          transforms
        )
      })

      res.push(element)
    } else { // text node
      const transform = transforms.get("text")
      const element = transform({node, type: "text", children: node.text})

      res.push(element)
    }
  }

  return res
}

function normalizeTransforms(
  transforms: CreateNodeTransformResult[]
): Map<string, NodeTransform> {
  const result = new Map<string, NodeTransform>()

  for (const [type, transform] of transforms) {
    if (!result.has(type)) {
      result.set(type, transform)
    }
  }

  return result
}

const transformNodes = <R extends Node[], T extends CreateNodeTransformResult[]>(
  root: R,
  transforms: T
) => iterateNodes(root, normalizeTransforms(transforms))

const text = createNodeTransform(
  "text",

  ({children}) => createElement("span", null, children)
)

const paragraph = createNodeTransform(
  "p",

  ({children}) => createElement("p", null, children)
)

const elements = transformNodes(
  [
    {
      type: "p",
      children: [
        {
          text: "Some text"
        }
      ]
    }
  ],

  [paragraph, text]
)

console.log(elements)
