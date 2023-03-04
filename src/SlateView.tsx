import {useMemo, Fragment} from "react"
import type {FC} from "react"

import type {Node} from "./types"
import {transformNodes} from "./transformNodes"

export interface SlateViewProps {
  nodes: Node[]
}

/**
 * Render Slate data format as react component
 */
export const SlateView: FC<SlateViewProps> = ({nodes}) => {
  const view = useMemo(() => transformNodes(nodes), [nodes])

  return (
    <Fragment>
      {view}
    </Fragment>
  )
}
