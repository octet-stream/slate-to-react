import type {RenderOptions, Queries, RenderResult} from "@testing-library/react"
import {render, queries} from "@testing-library/react"
import type {ExecutionContext} from "ava"
import type {ReactElement} from "react"

import test from "ava"

import {createContainerFactory} from "../__helper__/createContainerFactory.js"

type IsolatedRenderOptions = Omit<RenderOptions, "container">

type IsolatedRender<Q extends Queries = typeof queries> = (
  ui: ReactElement,
  options?: IsolatedRenderOptions
) => RenderResult<Q, HTMLDivElement, HTMLElement>

type Implementation = (
  t: ExecutionContext,
  isolatedRender: IsolatedRender
) => Promise<unknown>

/**
 * Creates isolated container for each `render` function call allowing to perform parallel tests with AVA.
 *
 * Adds this isolated `render` function to test implementation arguments.
 */
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
