# slate-to-react

React component and utilities to transform [Slate](https://github.com/ianstormtaylor/slate) nodes to React.

[![codecov](https://codecov.io/gh/octet-stream/slate-to-react/branch/main/graph/badge.svg?token=MBkEyEwJO6)](https://codecov.io/gh/octet-stream/slate-to-react)
[![CI](https://github.com/octet-stream/slate-to-react/actions/workflows/ci.yml/badge.svg)](https://github.com/octet-stream/slate-to-react/actions/workflows/ci.yml)
[![ESLint](https://github.com/octet-stream/slate-to-react/actions/workflows/eslint.yml/badge.svg)](https://github.com/octet-stream/slate-to-react/actions/workflows/eslint.yml)
[![TypeScript Types](https://github.com/octet-stream/slate-to-react/actions/workflows/typescript.yml/badge.svg)](https://github.com/octet-stream/slate-to-react/actions/workflows/typescript.yml)

## Roadmap

- [x] Minimal implementation with default transforms;
- [ ] Support custom transforms;
- [ ] Make `SlateView` and `transformNodes` generic functions

## Installation

To install, run one of the following commands:

pnpm:

```sh
pnpm add slate-to-react
```

npm:

```sh
npm i slate-to-react
```

yarn:

```sh
yarn add slate-to-react
```

### Usage

1. You can render Slate nodes using `SlateView` component:

```tsx
import {createRoot} from "react-dom/client"
import type {FC} from "react"

import {SlateView} from "slate-to-react"

const App: FC = () => (
  <SlateView
    nodes={[
      type: "p",
      children: [{
        text: "Hello, world!"
      }]
    ]}
  />
)

const root = document.querySelector("#root")

createRoot(root).render(<App />)
```

2. Alternatively you can use `transformNodes` function in your own component:

```tsx
import {createRoot} from "react-dom/client"
import type {FC} from "react"
import {useMemo} from "react"

import type {Node} from "slate-to-react"
import {transformNodes} from "slate-to-react"

interface MySlateViewProps {
  nodes: Node[]
}

const MySlateView: FC<SMylateToReactProps> = ({nodes}) => {
  const view = useMemo(() => transformNodes(nodes), [nodes])

  return (
    <div>
      <h1>Post title</h1>

      <div>
        {view}
      </div>
    </div>
  )
}

const App: FC = () => (
  <MySlateView
    nodes={[
      type: "p",
      children: [{
        text: "Hello, world!"
      }]
    ]}
  />
)

const root = document.querySelector("#root")

createRoot(root).render(<App />)
```

## API

### `SlateView`

React component that will render given `nodes` as React elements.

This component takes following props:

| Name  | Type   | Required  | Default | Description                        |
|-------|--------|:---------:|:-------:|------------------------------------|
| nodes | Node[] | Yes       | —       | List of `Slate` nodes to transform |

### `useSlateToReact(nodes: Node[]): ReactElement`

React hook that transforms given Slate nodes to React elements and memoizes the result.

This hook takes following arguments:

| Name  | Type   | Required  | Default | Description                        |
|-------|--------|:---------:|:-------:|------------------------------------|
| nodes | Node[] | Yes       | —       | List of `Slate` nodes to transform |

### `transformNodes(nodes: Node[]): ReactElement`

Transforms given Slate `nodes` to react elements.

This function takes following arguments:

| Name  | Type   | Required  | Default | Description                        |
|-------|--------|:---------:|:-------:|------------------------------------|
| nodes | Node[] | Yes       | —       | List of `Slate` nodes to transform |

Returns `ReactElement`. All nodes will be wrapped within `React.Fragment`, so you can even return them from your components as-is.
