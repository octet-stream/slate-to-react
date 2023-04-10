import type {RenderOptions, Queries, RenderResult} from "@testing-library/react"
import {render, queries} from "@testing-library/react"
import type {ExecutionContext} from "ava"
import type {ReactElement} from "react"

import test from "ava"

import {createContainerFactory} from "../__helper__/createContainerFactory.js"

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

type Implementation = (
  t: ExecutionContext,

  // eslint-disable-next-line no-shadow
  render: IsolatedRender
) => Promise<void>

export const withRender = test.macro(async (t, impl: Implementation) => {
  const {createContainer, cleanupContainers} = createContainerFactory()

  const isolatedRender = (
    ui: ReactElement,
    options: IsolatedRenderOptions = {}
  ) => render(ui, {
    ...options, container: createContainer()
  })

  try {
    await impl(t, isolatedRender)
  } finally {
    cleanupContainers()
  }
})
