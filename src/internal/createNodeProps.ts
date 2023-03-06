export interface NodeProps<TAttributes extends object = object> {
  /**
   * @deprecated use attributes.key isntead
   */
  key: string
  attributes: TAttributes & {
    key: string
  }
}

export function createNodeProps(): NodeProps {
  const key = crypto.randomUUID()

  return {key, attributes: {key}}
}
