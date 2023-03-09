import type {RenderOptions, Queries, RenderResult} from "@testing-library/react"
import {render, queries} from "@testing-library/react"
import type {ImplementationFn} from "ava"
import type {ReactElement} from "react"

import test from "ava"

type IsolatedRenderOptions = Omit<RenderOptions, "container">

interface IsolatedRender<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
> {
  (
    ui: ReactElement,
    options?: IsolatedRenderOptions
  ): RenderResult<Q, Container, BaseElement>
}

type Implementation = ImplementationFn<[render: IsolatedRender]>

export const withRender = test.macro(async (t, fn: Implementation) => {
  const container = document.createElement("div")

  const isolatedRender = (
    ui: ReactElement,
    options: IsolatedRenderOptions = {}
  ) => render(ui, {
    ...options, container: document.body.appendChild(container)
  })

  try {
    await fn(t, isolatedRender)
  } finally {
    document.body.removeChild(container)
  }
})
