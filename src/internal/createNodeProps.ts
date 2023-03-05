import type {ReactNode} from "react"

export interface BaseNodeInput {
  children: ReactNode
}

export interface CreateNodePropsResult<TAttributes extends object = object> {
  /**
   * @deprecated use attributes.key isntead
   */
  key: string
  attributes: TAttributes & {
    key: string
  }
}

export function createNodeProps(): CreateNodePropsResult {
  const key = crypto.randomUUID()

  return {key, attributes: {key}}
}
