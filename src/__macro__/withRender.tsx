import type {RenderOptions, Queries, RenderResult} from "@testing-library/react"
import {render, queries} from "@testing-library/react"
import type {ExecutionContext} from "ava"
import type {ReactElement} from "react"

import test from "ava"

import {createContainerFactory} from "../__helper__/createContainerFactory.js"

type IsolatedRenderOptions = Omit<RenderOptions, "container">

interface IsolatedRender<Q extends Queries = typeof queries> {
  (
    ui: ReactElement,
    options?: IsolatedRenderOptions
  ): RenderResult<Q, HTMLDivElement, HTMLElement>
}

type Implementation = (
  t: ExecutionContext,
  isolatedRender: IsolatedRender
) => Promise<unknown>

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
