import type {RenderOptions, Queries, RenderResult} from "@testing-library/react"
import {render, queries} from "@testing-library/react"
import type {ImplementationFn} from "ava"
import type {ReactElement} from "react"

import test from "ava"

interface IsolatedRender<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
> {
  (
    ui: ReactElement,
    options?: Omit<RenderOptions, "container">
  ): RenderResult<Q, Container, BaseElement>
}

type Implementation = ImplementationFn<[render: IsolatedRender]>

export const withRender = test.macro(async (t, fn: Implementation) => {
  const container = document.createElement("div")

  const isolatedRender = (ui: ReactElement) => render(ui, {
    container: document.body.appendChild(container)
  })

  try {
    await fn(t, isolatedRender)
  } finally {
    document.body.removeChild(container)
  }
})
